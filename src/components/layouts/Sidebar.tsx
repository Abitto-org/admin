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
  Analytics,
  HelpCenter,
  Settings,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { type JSX, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CollapseIcon from "@/assets/icons/collapse.svg";

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

const navSections: NavSection[] = [
  {
    title: "General",
    links: [
      { label: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
      { label: "Link Requests", path: "/link-requests", icon: <LinkIcon /> },
      { label: "Meters", path: "/meters", icon: <Speed /> },
      { label: "Users", path: "/users", icon: <People /> },
      { label: "Transactions", path: "/transactions", icon: <Receipt /> },
      { label: "Analytics", path: "/analytics", icon: <Analytics /> },
    ],
  },
  {
    title: "System",
    links: [
      { label: "Help Center", path: "/help-center", icon: <HelpCenter /> },
      { label: "Settings", path: "/settings", icon: <Settings /> },
    ],
  },
];

const Sidebar: FC<SidebarProps> = ({
  isCollapsed,
  isMobileOpen,
  onToggleCollapse,
  onCloseMobile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked");
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
          width: {
            xs: "85%",
            md: isCollapsed ? "auto" : "273px",
          },
          minWidth: {
            xs: "85%",
            md: isCollapsed ? "auto" : "273px",
          },
          height: "100vh",
          padding: { xs: "16px", md: "21px" },
          borderRight: "1px solid #ECECEC",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease-in-out",
          overflowX: "hidden",
          position: { xs: "fixed", md: "sticky" },
          top: 0,
          left: {
            xs: isMobileOpen ? 0 : "-100%",
            md: 0,
          },
          bgcolor: "white",
          zIndex: { xs: 1200, md: "auto" },
        }}
      >
        {/* Brand and Collapse Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "18px", md: "20px" },
              lineHeight: "24px",
              letterSpacing: "-0.01em",
              textTransform: "capitalize",
              color: "#669900",
              whiteSpace: "nowrap",
              display: { xs: "block", md: isCollapsed ? "none" : "block" },
            }}
          >
            AbittoEnergy
          </Typography>
          <IconButton
            onClick={onToggleCollapse}
            sx={{
              width: { xs: "28px", md: "32px" },
              height: { xs: "28px", md: "32px" },
              padding: 0,
              transition: "transform 0.5s ease-in-out",
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <Box
              component="img"
              src={CollapseIcon}
              alt="collapse"
              sx={{
                width: { xs: "28px", md: "32px" },
                height: { xs: "28px", md: "32px" },
              }}
            />
          </IconButton>
        </Box>

        {/* Navigation Sections */}
        <Stack spacing={3} sx={{ flex: 1, overflowY: "auto" }}>
          {navSections.map((section, index) => (
            <Box key={index}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
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
                        transition: "all 0.2s ease-in-out",
                        justifyContent: {
                          xs: "flex-start",
                          md: isCollapsed ? "center" : "flex-start",
                        },
                        "&:hover": {
                          backgroundColor: "#FAFAFA",
                        },
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
                          letterSpacing: "0%",
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

          {/* Logout Button */}
          <Tooltip title={isCollapsed ? "Logout" : ""} placement="right">
            <Box
              onClick={handleLogout}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: "12px", md: isCollapsed ? 0 : "12px" },
                padding: "12px 16px",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor: "#EA00001A",
                transition: "all 0.2s ease-in-out",
                justifyContent: {
                  xs: "flex-start",
                  md: isCollapsed ? "center" : "flex-start",
                },
                "&:hover": {
                  backgroundColor: "#EA00002A",
                },
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
                  letterSpacing: "0%",
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
    </>
  );
};

export default Sidebar;
