import {
  Box,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  Backdrop,
} from "@mui/material";
import {
  Dashboard,
  Link as LinkIcon,
  Speed,
  People,
  Receipt,
  // HelpCenter,
  Settings,
  Logout as LogoutIcon,
  House,
} from "@mui/icons-material";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ABITTO_LOGO from "@/assets/abitto_logo.png";
import { type JSX, type FC, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CollapseIcon from "@/assets/icons/collapse.svg";
import { useAuthStore } from "@/store/auth.store";
import useDisclosure from "@/hooks/useDisclosure";
import LogoutConfirmDialog from "@/components/ui/modals/LogoutConfirmDialog";
import { usePermissions } from "@/hooks/usePermissions";

interface NavLink {
  label: string;
  path: string;
  icon: JSX.Element;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

const SIDEBAR_STORAGE_KEY = "sidebar-collapsed-state";

const ALL_NAV_SECTIONS: (NavSection & { requiredRoles?: string[] })[] = [
  {
    title: "General",
    links: [
      { label: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
      { label: "Link Requests", path: "/link-requests", icon: <LinkIcon /> },
      { label: "Meters", path: "/meters", icon: <Speed /> },
      { label: "Users", path: "/users", icon: <People /> },
      { label: "Estates", path: "/estates", icon: <House /> },
      { label: "Transactions", path: "/transactions", icon: <Receipt /> },
      {
        label: "Incidents",
        path: "/incidents",
        icon: <GasMeterIcon />,
      },
      {
        label: "Admin & Roles",
        path: "/admin",
        icon: <AdminPanelSettingsIcon />,
      },
    ],
  },
  {
    title: "System",
    links: [
      // { label: "Help Center", path: "/help-center", icon: <HelpCenter /> },
      { label: "Settings", path: "/settings", icon: <Settings /> },
    ],
  },
];

// Which paths each role can see in the sidebar
const SIDEBAR_ACCESS: Record<string, string[]> = {
  "/dashboard": ["super-admin", "admin", "support"],
  "/link-requests": ["super-admin", "admin", "support", "installer"],
  "/meters": ["super-admin", "admin", "support", "installer"],
  "/estates": ["super-admin", "admin", "support"],
  "/users": ["super-admin", "admin", "support", "installer"],
  "/transactions": ["super-admin", "admin", "support"],
  "/incidents": ["super-admin", "admin", "support"],
  "/admin": ["super-admin"],
  "/help-center": ["super-admin", "admin", "support"],
  "/settings": ["super-admin", "admin"],
};

const Sidebar: FC<SidebarProps> = ({
  isCollapsed,
  isMobileOpen,
  onToggleCollapse,
  onCloseMobile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const logoutDialog = useDisclosure();
  const { role } = usePermissions();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Filter nav sections based on current role
  const filteredSections = useMemo(() => {
    if (!role) return [];
    return ALL_NAV_SECTIONS.map((section) => ({
      ...section,
      links: section.links.filter((link) => {
        const allowed = SIDEBAR_ACCESS[link.path];
        if (!allowed) return true; // default show if not specified
        return allowed.includes(role);
      }),
    })).filter((section) => section.links.length > 0);
  }, [role]);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onCloseMobile();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      <Backdrop
        open={isMobileOpen}
        onClick={onCloseMobile}
        sx={{
          display: { xs: "block", md: "none" },
          zIndex: 1199,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "75%", md: isCollapsed ? "auto" : "273px" },
          minWidth: { xs: "75%", md: isCollapsed ? "auto" : "273px" },
          height: "100dvh",
          padding: { xs: "16px", md: "21px" },
          borderRight: "1px solid #ECECEC",
          display: "flex",
          flexDirection: "column",
          transition:
            "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
          position: { xs: "fixed", md: "sticky" },
          top: 0,
          left: { xs: isMobileOpen ? 0 : "-100%", md: 0 },
          bgcolor: "white",
          zIndex: { xs: 1200, md: "auto" },
        }}
      >
        {/* Brand and Collapse Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "space-between",
              md: isCollapsed ? "center" : "space-between",
            },
            mb: 4,
            gap: 1,
          }}
        >
          {!isCollapsed && (
            <Box
              component="img"
              src={ABITTO_LOGO}
              alt="abitto logo"
              sx={{ width: { xs: "100px", sm: "140px" }, height: "auto" }}
            />
          )}
          <Tooltip
            title={isCollapsed ? "Show menu" : "Hide menu"}
            placement="right"
          >
            <IconButton
              onClick={onToggleCollapse}
              sx={{
                width: { xs: "28px", md: "32px" },
                height: { xs: "28px", md: "32px" },
                padding: 0,
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <Box
                component="img"
                src={CollapseIcon}
                alt="collapse"
                sx={{
                  width: { xs: "28px", md: isCollapsed ? "45px" : "32px" },
                  height: { xs: "28px", md: isCollapsed ? "45px" : "32px" },
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Navigation Sections */}
        <Stack
          className="no-scrollbar"
          spacing={3}
          sx={{ flex: 1, overflowY: "auto", pb: 5 }}
        >
          {filteredSections.map((section, index) => (
            <Box key={index}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "100%",
                  textTransform: "capitalize",
                  color: "#414141",
                  mb: "12px",
                  display: { xs: "block", md: isCollapsed ? "none" : "block" },
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={0.5}>
                {section.links.map((link, linkIndex) => (
                  <Tooltip
                    key={linkIndex}
                    title={isCollapsed ? link.label : ""}
                    placement="right"
                  >
                    <Box
                      onClick={() => handleNavigation(link.path)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: "12px", md: isCollapsed ? 0 : "12px" },
                        padding: "12px 16px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        backgroundColor: isActive(link.path)
                          ? "#FAFAFA"
                          : "transparent",
                        justifyContent: {
                          xs: "flex-start",
                          md: isCollapsed ? "center" : "flex-start",
                        },
                        "&:hover": { backgroundColor: "#FAFAFA" },
                        "& .MuiSvgIcon-root": {
                          fontSize: "20px",
                          color: "#414141",
                          flexShrink: 0,
                        },
                      }}
                    >
                      {link.icon}
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          lineHeight: "100%",
                          textTransform: "capitalize",
                          color: "#414141",
                          whiteSpace: "nowrap",
                          display: {
                            xs: "block",
                            md: isCollapsed ? "none" : "block",
                          },
                        }}
                      >
                        {link.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          ))}

          {/* Logout */}
          <Tooltip title={isCollapsed ? "Logout" : ""} placement="right">
            <Box
              onClick={logoutDialog.onOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: "12px", md: isCollapsed ? 0 : "12px" },
                padding: "12px 16px",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor: "#EA00001A",
                justifyContent: {
                  xs: "flex-start",
                  md: isCollapsed ? "center" : "flex-start",
                },
                "&:hover": { backgroundColor: "#EA00002A" },
                "& .MuiSvgIcon-root": {
                  fontSize: "20px",
                  color: "#EA0000",
                  flexShrink: 0,
                },
              }}
            >
              <LogoutIcon />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  textTransform: "capitalize",
                  color: "#EA0000",
                  whiteSpace: "nowrap",
                  display: { xs: "block", md: isCollapsed ? "none" : "block" },
                }}
              >
                Logout
              </Typography>
            </Box>
          </Tooltip>
        </Stack>
      </Box>

      <LogoutConfirmDialog
        open={logoutDialog.open}
        onClose={logoutDialog.onClose}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
