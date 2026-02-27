import { Box, Avatar, Typography, Stack, Tooltip } from "@mui/material";
import { type FC, useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import RefreshIcon from "@/assets/icons/refresh.svg";
import NotificationsIcon from "@/assets/icons/notifications.svg";
import CollapseIcon from "@/assets/icons/collapse.svg";
import type { User } from "@/types/users.types";
import { getInitials, getDisplayName, getRole } from "@/utils/auth";
import { useGetUnreadCount } from "@/hooks/useNotifications";
import NotificationsDropdown from "@/components/ui/notifications/NotificationsDropdown";

interface NavbarProps {
  user?: User | null;
  onMobileMenuToggle?: () => void;
}

const Navbar: FC<NavbarProps> = ({ user, onMobileMenuToggle }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const { data: unreadData } = useGetUnreadCount();
  const unreadCount = unreadData?.data?.count ?? 0;

  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    if (notificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationsOpen]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: { xs: "12px 12px", md: "16px 24px" },
        borderBottom: { xs: "1px solid #ECECEC", md: "none" },
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Mobile: Menu Toggle and Logo */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Box
          onClick={onMobileMenuToggle}
          sx={{
            width: "28px",
            height: "28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="toggle menu"
        >
          <Box
            component="img"
            src={CollapseIcon}
            alt="menu"
            sx={{ width: "28px", height: "28px" }}
          />
        </Box>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "20px",
            letterSpacing: "-0.01em",
            textTransform: "capitalize",
            color: "#669900",
            whiteSpace: "nowrap",
          }}
        >
          AbittoEnergy
        </Typography>
      </Box>

      {/* Right Side Actions */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          gap: { xs: "12px", md: "24px" },
          marginLeft: { xs: 0, md: "auto" },
        }}
      >
        {/* Refresh Button */}
        <Tooltip title="Refresh" placement="top">
          <Box
            onClick={handleRefresh}
            sx={{
              width: "28px",
              height: "28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              transition: "background-color 0.2s ease-in-out",
              "&:hover": { backgroundColor: "#FAFAFA" },
            }}
            aria-label="refresh"
          >
            <Box
              component="img"
              src={RefreshIcon}
              alt="refresh"
              sx={{ width: "28px", height: "28px" }}
            />
          </Box>
        </Tooltip>

        {/* Notifications Button */}
        <Box ref={notificationsRef} sx={{ position: "relative" }}>
          <Tooltip title="Notifications" placement="top">
            <Box
              onClick={() => setNotificationsOpen((prev) => !prev)}
              sx={{
                width: "28px",
                height: "28px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                transition: "background-color 0.2s ease-in-out",
                position: "relative",
                "&:hover": { backgroundColor: "#FAFAFA" },
              }}
              aria-label="notifications"
            >
              <Box
                component="img"
                src={NotificationsIcon}
                alt="notifications"
                sx={{ width: "28px", height: "28px" }}
              />

              {/* Unread badge */}
              {unreadCount > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    minWidth: "16px",
                    height: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#CC3300",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 3px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "10px",
                      lineHeight: "100%",
                      color: "white",
                    }}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Typography>
                </Box>
              )}
            </Box>
          </Tooltip>

          {/* Dropdown */}
          {notificationsOpen && <NotificationsDropdown />}
        </Box>

        {/* User Profile — Desktop */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Avatar
            sx={{
              width: { md: "40px", lg: "47px" },
              height: { md: "40px", lg: "47px" },
              backgroundColor: "#3266CC",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            {getInitials(user)}
          </Avatar>

          <Stack spacing="4px">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#000000",
              }}
            >
              {getDisplayName(user)}
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "32px",
                padding: "6px 16px",
                backgroundColor: "#6699001A",
                width: "fit-content",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#669900",
                }}
              >
                {getRole(user)}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* User Profile — Mobile avatar only */}
        <Avatar
          sx={{
            width: "32px",
            height: "32px",
            backgroundColor: "#3266CC",
            fontWeight: 600,
            fontSize: "14px",
            display: { xs: "flex", sm: "none" },
          }}
        >
          {getInitials(user)}
        </Avatar>
      </Stack>
    </Box>
  );
};

export default Navbar;
