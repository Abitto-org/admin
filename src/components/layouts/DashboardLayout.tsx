import { Box } from "@mui/material";
import { type FC, type PropsWithChildren, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuthStore } from "@/store/auth.store";

const SIDEBAR_STORAGE_KEY = "sidebar-collapsed-state";

// Helper function to get initial collapsed state from localStorage
const getInitialCollapsedState = (): boolean => {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  } catch {
    return false;
  }
};

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthStore();

  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsedState);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggleCollapse = () => {
    // On mobile (below md breakpoint), toggle the sidebar open/close
    if (window.innerWidth < 900) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      // On desktop, toggle the collapse state
      setIsCollapsed((prev) => !prev);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleCloseMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <Box display="flex" height="100dvh" overflow="hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggleCollapse={handleToggleCollapse}
        onCloseMobile={handleCloseMobile}
      />

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
        <Navbar user={user} onMobileMenuToggle={handleMobileMenuToggle} />

        {/* Page Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: { xs: "12px", md: "24px" },
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
