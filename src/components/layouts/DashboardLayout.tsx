import { Box } from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps extends PropsWithChildren {
  user?: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, user }) => {
  return (
    <Box display="flex" height="100vh" overflow="hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: { xs: "100%", md: "auto" },
        }}
      >
        {/* Navbar */}
        <Navbar user={user} />

        {/* Page Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: { xs: "16px", md: "24px" },
            backgroundColor: "#FAFAFA",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
