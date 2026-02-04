import { type FC, useState } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";

interface Users {
  id: string;
  name: string;
  email: string;
  status: "linked" | "pending" | "unlinked";
  date: string;
  gasStatus: "Active" | "Inactive";
}

const mockUserss: Users[] = [
  {
    id: "1",
    name: "Chris Mbah",
    email: "chris@gmail.com",
    status: "linked",
    date: "20-08-2025 | 8:58am",
    gasStatus: "Active",
  },
  {
    id: "2",
    name: "Chris Mbah",
    email: "chris@gmail.com",
    status: "pending",
    date: "20-08-2025 | 8:58am",
    gasStatus: "Inactive",
  },
  {
    id: "3",
    name: "Christian Mbah",
    email: "chris@gmail.com",
    status: "unlinked",
    date: "20-08-2025 | 8:58am",
    gasStatus: "Active",
  },
  {
    id: "4",
    name: "Chris Mbah",
    email: "chris@gmail.com",
    status: "linked",
    date: "20-08-2025 | 8:58am",
    gasStatus: "Active",
  },
  {
    id: "5",
    name: "Chris Mbah",
    email: "chris@gmail.com",
    status: "linked",
    date: "20-08-2025 | 8:58am",
    gasStatus: "Active",
  },
  {
    id: "6",
    name: "Chris Mbah",
    email: "chris@gmail.com",
    status: "pending",
    date: "20-08-2025 | 8:58am",
    gasStatus: "Active",
  },
];

const badgeConfig: BadgeConfig = {
  status: {
    linked: { bg: "#E8F5E9", text: "#2E7D32" },
    pending: { bg: "#FFF9C4", text: "#F57F17" },
    unlinked: { bg: "#FFEBEE", text: "#EA0000" },
  },
};

const UsersTable: FC = () => {
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
  const columns: Column<Users>[] = [
    {
      key: "name",
      label: "Name",
      minWidth: "160px",
    },
    {
      key: "email",
      label: "Email",
      minWidth: "100px",
    },
    {
      key: "status",
      label: "Status",
      renderCell: (value) => (
        <Badge type="status" value={value} config={badgeConfig} />
      ),
    },
    {
      key: "date",
      label: "Date Created",
      minWidth: "100px",
    },
    {
      key: "gasStatus",
      label: "Gas Status",
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
    { label: "Linked", value: "linked" },
    { label: "Pending", value: "pending" },
    { label: "Unlinked", value: "unlinked" },
  ];

  return (
    <DataTable
      title="Meters"
      subtitle="Details of All Users"
      columns={columns}
      data={mockUserss}
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

export default UsersTable;
