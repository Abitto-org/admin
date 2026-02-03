import { Box, Typography, IconButton, Stack, Tooltip } from "@mui/material";
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
import { type FC, type JSX, useState } from "react";
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

const Sidebar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      sx={{
        width: isCollapsed ? "auto" : "273px",
        minWidth: isCollapsed ? "auto" : "273px",
        height: "100vh",
        padding: "21px",
        borderRight: "1px solid #ECECEC",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        overflowX: "hidden",
        position: { xs: "fixed", md: "sticky" },
        top: 0,
        left: 0,
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
        {!isCollapsed && (
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "24px",
              letterSpacing: "-0.01em",
              textTransform: "capitalize",
              color: "#669900",
              whiteSpace: "nowrap",
            }}
          >
            AbittoEnergy
          </Typography>
        )}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            width: "32px",
            height: "32px",
            padding: 0,
            transition: "transform 0.5s ease-in-out",
            transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <Box
            component="img"
            src={CollapseIcon}
            alt="collapse"
            sx={{ width:"32px", height: "32px" }}
          />
        </IconButton>
      </Box>

      {/* Navigation Sections */}
      <Stack spacing={3} sx={{ flex: 1, overflowY: "auto" }}>
        {navSections.map((section, index) => (
          <Box key={index}>
            {!isCollapsed && (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#414141",
                  mb: "12px",
                }}
              >
                {section.title}
              </Typography>
            )}
            <Stack spacing={0.5}>
              {section.links.map((link, linkIndex) => (
                <Tooltip
                  key={linkIndex}
                  title={isCollapsed ? link.label : ""}
                  placement="right"
                >
                  <Box
                    onClick={() => navigate(link.path)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: isCollapsed ? 0 : "12px",
                      padding: "12px 16px",
                      cursor: "pointer",
                      borderRadius: "8px",
                      backgroundColor: isActive(link.path)
                        ? "#FAFAFA"
                        : "transparent",
                      transition: "all 0.2s ease-in-out",
                      justifyContent: isCollapsed ? "center" : "flex-start",
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
                    {!isCollapsed && (
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                          textTransform: "capitalize",
                          color: "#414141",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {link.label}
                      </Typography>
                    )}
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
              gap: isCollapsed ? 0 : "12px",
              padding: "12px 16px",
              cursor: "pointer",
              borderRadius: "8px",
              backgroundColor: "#EA00001A",
              transition: "all 0.2s ease-in-out",
              justifyContent: isCollapsed ? "center" : "flex-start",
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
            {!isCollapsed && (
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#EA0000",
                  whiteSpace: "nowrap",
                }}
              >
                Logout
              </Typography>
            )}
          </Box>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default Sidebar;
