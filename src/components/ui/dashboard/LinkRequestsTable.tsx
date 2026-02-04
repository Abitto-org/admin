import { type FC, useState } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";

interface LinkRequest {
  id: string;
  meterId: string;
  user: string;
  requestType: string;
  date: string;
  status: "success" | "pending" | "failed";
}

const mockLinkRequests: LinkRequest[] = [
  {
    id: "1",
    meterId: "12r5543377283464",
    user: "Chibuike Man",
    requestType: "New Link",
    date: "20-08-2025 | 8:58am",
    status: "success",
  },
  {
    id: "2",
    meterId: "12r5543377283464",
    user: "Chibuike Obisike",
    requestType: "New Link",
    date: "20-08-2025 | 8:58am",
    status: "failed",
  },
  {
    id: "3",
    meterId: "12r5543377283464",
    user: "Chris Mbah",
    requestType: "New Link",
    date: "20-08-2025 | 8:58am",
    status: "success",
  },
  {
    id: "4",
    meterId: "12r5543377283464",
    user: "Nelsomn Maduka",
    requestType: "New Link",
    date: "20-08-2025 | 8:58am",
    status: "failed",
  },
  {
    id: "5",
    meterId: "12r5543377283464",
    user: "Chibuike Man",
    requestType: "New Link",
    date: "20-08-2025 | 8:58am",
    status: "pending",
  },
  {
    id: "6",
    meterId: "12r5543377283464",
    user: "Chibuike Man",
    requestType: "Re-Link",
    date: "20-08-2025 | 8:58am",
    status: "success",
  },
];

// Badge color configuration
const badgeConfig: BadgeConfig = {
  status: {
    success: { bg: "#E8F5E9", text: "#2E7D32" },
    pending: { bg: "#FFF9C4", text: "#F57F17" },
    failed: { bg: "#FFEBEE", text: "#EA0000" },
  },
};

const LinkRequestsTable: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleViewTransaction = (id: string) => {
    console.log("View transaction:", id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic to fetch data for the selected page
  };

  const handleSearchChange = (value: string) => {
    console.log("Search:", value);
    // Add search logic here
  };

  const handleFilterChange = (value: string) => {
    console.log("Filter:", value);
    // Add filter logic here
  };

  // Column configuration
  const columns: Column<LinkRequest>[] = [
    {
      key: "meterId",
      label: "Meter ID",
      minWidth: "160px",
    },
    {
      key: "user",
      label: "User",
      minWidth: "100px",
    },
    {
      key: "requestType",
      label: "Request Type",
      minWidth: "100px",
    },
    {
      key: "date",
      label: "Date",
      minWidth: "120px",
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
        <LinkText text="View" onClick={() => handleViewTransaction(row.id)} />
      ),
    },
  ];

  // Filter options
  const filterOptions = [
    { label: "All", value: "filter" },
    { label: "Success", value: "success" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
  ];

  return (
    <DataTable
      title="Requests"
      subtitle="All Meter Linking Requests"
      columns={columns}
      data={mockLinkRequests}
      searchable
      searchPlaceholder="Search"
      onSearchChange={handleSearchChange}
      filterable
      filterOptions={filterOptions}
      onFilterChange={handleFilterChange}
      defaultFilterValue="filter"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default LinkRequestsTable;
