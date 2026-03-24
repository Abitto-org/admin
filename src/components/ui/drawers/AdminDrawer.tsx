import { type FC } from "react";
import { Box, Typography } from "@mui/material";
import CustomDrawer from "./CustomDrawer";
import AdminDetailsForm from "../forms/AdminDetailsForm";
import type { User } from "@/types/users.types";

interface AdminDrawerProps {
  adminDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  admin: User | null;
}

const AdminDrawer: FC<AdminDrawerProps> = ({ adminDrawer, admin }) => {
  return (
    <CustomDrawer open={adminDrawer.open} onClose={adminDrawer.onClose}>
      {admin ? (
        <AdminDetailsForm admin={admin} onClose={adminDrawer.onClose} />
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography>No admin selected</Typography>
        </Box>
      )}
    </CustomDrawer>
  );
};

export default AdminDrawer;
