import { type FC, useMemo } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";
import type { UserTableRow, GetUsersResponse } from "@/types/users.types";

// Badge color configuration
const badgeConfig: BadgeConfig = {
  status: {
    active: { bg: "#E8F5E9", text: "#2E7D32" },
    inactive: { bg: "#FFEBEE", text: "#EA0000" },
  },
  meterStatus: {
    linked: { bg: "#E8F5E9", text: "#2E7D32" },
    unlinked: { bg: "#FFF9C4", text: "#F57F17" },
  },
};

interface UsersTableProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  data: GetUsersResponse | undefined;
  isLoading: boolean;
}

const UsersTable: FC<UsersTableProps> = ({
  currentPage,
  onPageChange,
  onSearchChange,
  filterValue,
  onFilterChange,
  data,
  isLoading,
}) => {
  const handleViewUser = (id: string) => {
    console.log("View user:", id);
    // Navigate to user details page or open modal
  };

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
  };

  const handleFilterChange = (value: string) => {
    onFilterChange(value);
    onPageChange(1); // Reset to page 1 when filter changes
  };

  // Transform API data to table rows
  const tableData: UserTableRow[] = useMemo(() => {
    if (!data?.data?.users) return [];

    return data.data.users.map((user) => {
      // Format user name with null checks
      const userName =
        `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A";

      // Format role from slug to title case
      const formatRole = (role: string) => {
        if (!role) return "N/A";
        return role
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      };

      // Format date
      const formatDate = (dateString: string) => {
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

      return {
        id: user.id,
        name: userName,
        email: user.email,
        phoneNumber: user.phoneNumber || "N/A",
        role: formatRole(user.role),
        status: user.isActive,
        meterLinked: user.hasLinkedMeter,
        dateJoined: formatDate(user.createdAt),
      };
    });
  }, [data]);

  // Column configuration
  const columns: Column<UserTableRow>[] = [
    {
      key: "name",
      label: "Name",
      minWidth: "150px",
    },
    {
      key: "email",
      label: "Email",
      minWidth: "200px",
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      minWidth: "140px",
    },
    {
      key: "role",
      label: "Role",
      minWidth: "120px",
    },
    {
      key: "status",
      label: "Status",
      renderCell: (value) => (
        <Badge
          type="status"
          value={value ? "active" : "inactive"}
          config={badgeConfig}
        />
      ),
    },
    {
      key: "meterLinked",
      label: "Meter Status",
      renderCell: (value) => (
        <Badge
          type="meterStatus"
          value={value ? "linked" : "unlinked"}
          config={badgeConfig}
        />
      ),
    },
    {
      key: "dateJoined",
      label: "Date Joined",
      minWidth: "160px",
    },
    {
      key: "actions",
      label: "Action",
      renderCell: (_, row) => (
        <LinkText text="View" onClick={() => handleViewUser(row.id)} />
      ),
    },
  ];

  // Filter options
  const filterOptions = [
    { label: "All Users", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <DataTable
      title="Users"
      subtitle="All Registered Users"
      columns={columns}
      data={tableData}
      searchable
      searchPlaceholder="Search by name, email, phone, or NIN"
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

export default UsersTable;
