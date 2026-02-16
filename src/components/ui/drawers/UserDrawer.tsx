import type { FC } from "react";
import CustomDrawer from "./CustomDrawer";
import { Box, Typography } from "@mui/material";
import type { User } from "@/types/users.types";
import UserDetailsForm from "../dashboard/UserDetailsForm";

interface UserDrawerProps {
  userDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  user: User | null;
}

const UserDrawer: FC<UserDrawerProps> = ({ userDrawer, user }) => {
  return (
    <CustomDrawer open={userDrawer.open} onClose={userDrawer.onClose}>
      {user ? (
        <UserDetailsForm onClose={userDrawer.onClose} user={user} />
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography>No user selected</Typography>
        </Box>
      )}
    </CustomDrawer>
  );
};

export default UserDrawer;
