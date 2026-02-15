// LinkRequestsTable.tsx - Add dummy data for testing
import { type FC, useMemo } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";
import type {
  LinkRequestTableRow,
  LinkRequestStatus,
  GetLinkRequestsResponse,
  LinkRequestDetailsData,
} from "@/types/linkRequests.types";

const badgeConfig: BadgeConfig = {
  status: {
    success: { bg: "#E8F5E9", text: "#2E7D32" },
    pending: { bg: "#FFF9C4", text: "#F57F17" },
    failed: { bg: "#FFEBEE", text: "#EA0000" },
  },
};

interface LinkRequestsTableProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  data: GetLinkRequestsResponse | undefined;
  isLoading: boolean;
  onViewRequest: (requestData: LinkRequestDetailsData) => void;
}

const LinkRequestsTable: FC<LinkRequestsTableProps> = ({
  currentPage,
  onPageChange,
  onSearchChange,
  filterValue,
  onFilterChange,
  data,
  isLoading,
  onViewRequest,
}) => {
  const handleViewRequest = (row: LinkRequestTableRow) => {
    const fullRequest = data?.data?.requests.find(
      (item) => item.request.id === row.id,
    );

    if (fullRequest) {
      const requestData: LinkRequestDetailsData = {
        id: fullRequest.request.id,
        userId: fullRequest.request.userId,
        meterId: fullRequest.request.meterId,
        deviceId: fullRequest.meter.deviceId,
        meterNumber: fullRequest.meter.meterNumber,
        userName:
          `${fullRequest.user.firstName} ${fullRequest.user.lastName}`.trim(),
        userEmail: fullRequest.user.email,
        estateId: fullRequest.request.estateId,
        estateName: fullRequest.request.estateName,
        houseNumber: fullRequest.request.houseNumber,
        status: fullRequest.request.status,
        requestType: fullRequest.request.adminId ? "Re-Link" : "New Link",
        createdAt: fullRequest.request.createdAt,
        reason: fullRequest.request.reason,
      };

      onViewRequest(requestData);
    }
  };

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
  };

  const handleFilterChange = (value: string) => {
    onFilterChange(value);
    onPageChange(1);
  };

  const tableData: LinkRequestTableRow[] = useMemo(() => {
    if (!data?.data?.requests) return [];

    return data.data.requests.map((item) => {
      const { request, user, meter } = item;

      const getStatusForBadge = (status: string): LinkRequestStatus => {
        if (status === "approved") return "success";
        if (status === "rejected") return "failed";
        return "pending";
      };

      const houseNumber = request.houseNumber || "N/A";
      const estatePart = request.estateName ? `, ${request.estateName}` : "";
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
          "Unassigned"
        : "Unassigned";

      const requestType = request.adminId ? "Re-Link" : "New Link";

      return {
        id: request.id || "",
        meterId: meter?.deviceId || "N/A",
        meterNumber: meter?.meterNumber || "N/A",
        user: userName,
        requestType,
        date: formatDate(request.createdAt),
        address,
        status: getStatusForBadge(request.status),
        rawStatus: request.status,
      };
    });
  }, [data]);

  const columns: Column<LinkRequestTableRow>[] = [
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
      key: "requestType",
      label: "Request Type",
      minWidth: "120px",
    },
    {
      key: "date",
      label: "Date",
      minWidth: "160px",
    },
    {
      key: "address",
      label: "Address",
      minWidth: "200px",
    },
    {
      key: "status",
      label: "Status",
      renderCell: (value) => (
        <Badge type="status" value={value} config={badgeConfig} />
      ),
    },
    {
      key: "actions",
      label: "Action",
      renderCell: (_, row) => (
        <LinkText
          text="View"
          onClick={() => handleViewRequest(row)}
          showIcon={false}
        />
      ),
    },
  ];

  const filterOptions = [
    { label: "All Requests", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <DataTable
      title="Requests"
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

export default LinkRequestsTable;
