import { type FC, useMemo } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";
import type {
  MeterTableRow,
  MeterLinkStatus,
  GetMetersResponse,
} from "@/types/meters.types";

// Badge color configuration
const badgeConfig: BadgeConfig = {
  status: {
    registered: { bg: "#E8F5E9", text: "#2E7D32" },
    unregistered: { bg: "#FFF9C4", text: "#F57F17" },
    active: { bg: "#E8F5E9", text: "#2E7D32" },
    inactive: { bg: "#FFEBEE", text: "#EA0000" },
  },
  valveStatus: {
    open: { bg: "#E8F5E9", text: "#2E7D32" },
    closed: { bg: "#FFEBEE", text: "#EA0000" },
  },
};

interface MetersTableProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  data: GetMetersResponse | undefined;
  isLoading: boolean;
}

const MetersTable: FC<MetersTableProps> = ({
  currentPage,
  onPageChange,
  // searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  data,
  isLoading,
}) => {
  const handleViewTransaction = (id: string) => {
    console.log("View meter:", id);
    // Navigate to meter details page or open modal
  };

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
  };

  const handleFilterChange = (value: string) => {
    onFilterChange(value);
    onPageChange(1); // Reset to page 1 when filter changes
  };

  // Transform API data to table rows
  const tableData: MeterTableRow[] = useMemo(() => {
    if (!data?.data?.meters) return [];

    return data.data.meters.map((item: (typeof data.data.meters)[number]) => {
      const { meter, user } = item;
      console.log("meter", meter);
      console.log("user", user);

      // Determine link status based on meter status
      const getLinkStatus = (status: string): MeterLinkStatus => {
        if (status === "registered" || status === "active") return "success";
        if (status === "inactive") return "failed";
        return "pending";
      };

      // Format address with null checks
      const houseNumber = meter.houseNumber || "N/A";
      const estatePart = meter.estateName ? `, ${meter.estateName}` : "";
      const address = `${houseNumber}${estatePart}`;

      // Format date with null check
      const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        try {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${day}-${month}-${year} | ${hours}:${minutes}`;
        } catch {
          return "N/A";
        }
      };

      // Format user name with null checks
      const userName = user
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
          user.email ||
          "Unassigned"
        : "Unassigned";

      return {
        id: meter.id || "",
        meterId: meter.deviceId || "N/A",
        meterNumber: meter.meterNumber || "N/A",
        user: userName,
        linkStatus: getLinkStatus(meter.status),
        date: formatDate(meter.createdAt),
        address,
        status: meter.status,
        valveStatus: meter.valveStatus,
      };
    });
  }, [data]);

  // Column configuration
  const columns: Column<MeterTableRow>[] = [
    {
      key: "meterNumber",
      label: "Meter Number",
      minWidth: "140px",
    },
    {
      key: "user",
      label: "User",
      minWidth: "150px",
    },
    {
      key: "status",
      label: "Status",
      renderCell: (value) => (
        <Badge type="status" value={value} config={badgeConfig} />
      ),
    },
    {
      key: "valveStatus",
      label: "Valve",
      renderCell: (value) => (
        <Badge
          type="valveStatus"
          value={value ? "open" : "closed"}
          config={badgeConfig}
        />
      ),
    },
    {
      key: "date",
      label: "Date Created",
      minWidth: "160px",
    },
    {
      key: "address",
      label: "Address",
      minWidth: "200px",
    },
    {
      key: "actions",
      label: "Action",
      renderCell: (_, row) => (
        <LinkText text="View" onClick={() => handleViewTransaction(row.id)} />
      ),
    },
  ];

  // Filter options
  const filterOptions = [
    { label: "All Meters", value: "all" },
    { label: "Linked", value: "linked" },
    { label: "Unlinked", value: "unlinked" },
  ];

  return (
    <DataTable
      title="Meters"
      subtitle="All Meter Linking Requests"
      columns={columns}
      data={tableData}
      searchable
      searchPlaceholder="Search by meter number, device ID, or user name"
      onSearchChange={handleSearchChange}
      filterable
      filterOptions={filterOptions}
      onFilterChange={handleFilterChange}
      defaultFilterValue={filterValue}
      currentPage={currentPage}
      totalPages={data?.data?.pagination?.totalPages || 1}
      onPageChange={onPageChange}
      isLoading={isLoading}
      skeletonRows={10}
    />
  );
};

export default MetersTable;
