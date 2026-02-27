import { type FC, useMemo, useState } from "react";
import { Menu, MenuItem, ListItemText } from "@mui/material";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";
import type {
  MeterTableRow,
  MeterLinkStatus,
  GetMetersResponse,
  MeterActionData,
} from "@/types/meters.types";

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
  onActionClick: (
    action: "link" | "unlink" | "view",
    meterData: MeterActionData,
  ) => void;
}

const MetersTable: FC<MetersTableProps> = ({
  currentPage,
  onPageChange,
  onSearchChange,
  filterValue,
  onFilterChange,
  data,
  isLoading,
  onActionClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<MeterTableRow | null>(null);

  const handleActionClick = (
    event: React.MouseEvent<HTMLElement>,
    row: MeterTableRow,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleMenuItemClick = (action: "link" | "unlink" | "view") => {
    if (selectedRow) {
      onActionClick(action, {
        deviceId: selectedRow.deviceId || selectedRow.meterId, 
        meterNumber: selectedRow.meterNumber,
        userId: selectedRow.userId,
        userName:
          selectedRow.user === "Unassigned" ? undefined : selectedRow.user,
        estateId: selectedRow.estateId,
        houseNumber: selectedRow.houseNumber,
        estateName: selectedRow.estateName,
      });
    }
    handleMenuClose();
  };

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
  };

  const handleFilterChange = (value: string) => {
    onFilterChange(value);
    onPageChange(1);
  };

  const tableData: MeterTableRow[] = useMemo(() => {
    if (!data?.data?.meters) return [];

    return data.data.meters.map((item: (typeof data.data.meters)[number]) => {
      const { meter, user } = item;

      const getLinkStatus = (status: string): MeterLinkStatus => {
        if (status === "registered" || status === "active") return "success";
        if (status === "inactive") return "failed";
        return "pending";
      };

      const houseNumber = meter.houseNumber || "N/A";
      const estatePart = meter.estateName ? `, ${meter.estateName}` : "";
      const address = `${houseNumber}${estatePart}`;

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
        userId: user?.id,
        linkStatus: getLinkStatus(meter.status),
        date: formatDate(meter.createdAt),
        address,
        status: meter.status,
        valveStatus: meter.valveStatus,
        estateId: meter.estateId || undefined,
        houseNumber: meter.houseNumber || undefined,
        estateName: meter.estateName || undefined,
        deviceId: meter.deviceId, // Add this line
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
        <LinkText text="Actions" onClick={(e) => handleActionClick(e, row)} />
      ),
    },
  ];

  const filterOptions = [
    { label: "All Meters", value: "all" },
    { label: "Linked", value: "linked" },
    { label: "Unlinked", value: "unlinked" },
  ];

  const hasUser = selectedRow?.user && selectedRow.user !== "Unassigned";

  return (
    <>
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            minWidth: "160px",
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("view")}>
          <ListItemText
            primary="View Details"
            primaryTypographyProps={{ fontSize: "14px" }}
          />
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(hasUser ? "unlink" : "link")}
        >
          <ListItemText
            primary={hasUser ? "Unlink Meter" : "Link Meter"}
            primaryTypographyProps={{
              fontSize: "14px",
              color: hasUser ? "#EA0000" : "#669900",
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MetersTable;
