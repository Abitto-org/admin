import { type FC, useMemo, useState } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";
import AdminDrawer from "@/components/ui/drawers/AdminDrawer";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetAdmins } from "@/hooks/useAdmins";
import type { User } from "@/types/users.types";

const badgeConfig: BadgeConfig = {
  role: {
    "super-admin": { bg: "#EDE7F6", text: "#4527A0" },
    admin: { bg: "#E3F2FD", text: "#1565C0" },
    support: { bg: "#E8F5E9", text: "#2E7D32" },
  },
};

interface AdminTableRow {
  id: string;
  name: string;
  email: string;
  role: string;
  actions: User;
}


const AdminRolesTable: FC = () => {
  const { data, isLoading } = useGetAdmins();
  console.log("Admin data: ", data);
  const adminDrawer = useDisclosure();
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);

  const handleViewAdmin = (admin: User) => {
    setSelectedAdmin(admin);
    adminDrawer.onOpen();
  };

  const tableData: AdminTableRow[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((admin) => ({
      id: admin.id,
      name:
        admin.firstName || admin.lastName
          ? `${admin.firstName ?? ""} ${admin.lastName ?? ""}`.trim()
          : "—",
      email: admin.email ?? "N/A",
      role: admin.role ?? "N/A",
      actions: admin,
    }));
  }, [data]);

  const columns: Column<AdminTableRow>[] = [
    { key: "name", label: "Name", minWidth: "160px" },
    { key: "email", label: "Email", minWidth: "200px" },
    {
      key: "role",
      label: "Role",
      minWidth: "140px",
      renderCell: (value: string) => (
        <Badge type="role" value={value} config={badgeConfig} />
      ),
    },
    {
      key: "actions",
      label: "Action",
      renderCell: (_: unknown, row: AdminTableRow) => (
        <LinkText
          text="View"
          onClick={() => handleViewAdmin(row.actions)}
          showIcon={false}
        />
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Admins & Roles"
        subtitle="Manage administrator access and permissions"
        columns={columns}
        data={tableData}
        searchable={false}
        filterable={false}
        showDateFilters={false}
        showTypeFilter={false}
        currentPage={1}
        totalPages={1}
        isLoading={isLoading}
        skeletonRows={5}
        containerSx={{ mt: 3 }}
      />

      <AdminDrawer adminDrawer={adminDrawer} admin={selectedAdmin} />
    </>
  );
};

export default AdminRolesTable;
