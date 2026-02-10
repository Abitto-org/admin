import { Box, Avatar, Typography, Stack, Tooltip } from "@mui/material";
import { type FC } from "react";
import RefreshIcon from "@/assets/icons/refresh.svg";
import NotificationsIcon from "@/assets/icons/notifications.svg";
import CollapseIcon from "@/assets/icons/collapse.svg";
import type { User } from "@/types/user.types";

interface NavbarProps {
  user?: User | null;
  onMobileMenuToggle?: () => void;
}

const Navbar: FC<NavbarProps> = ({ user, onMobileMenuToggle }) => {
  const handleRefresh = () => {
    console.log("Refresh clicked");
  };

  const handleNotifications = () => {
    console.log("Notifications clicked");
  };

  const getInitials = () => {
    if (!user) return "AU";

    // If both firstName and lastName exist, use their initials
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }

    // Otherwise, use first letter of email
    return user.email.charAt(0).toUpperCase();
  };

  const getDisplayName = () => {
    if (!user) return "Admin User";

    // If both firstName and lastName exist, use them
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }

    // Otherwise, use email username (before @) and truncate if too long
    const emailUsername = user.email.split("@")[0];
    const maxLength = 20;

    if (user.email.length > maxLength) {
      return emailUsername.substring(0, maxLength) + "...";
    }

    return emailUsername;
  };

  const getRole = () => {
    if (!user) return "Admin";

    // Remove hyphens/underscores and capitalize each word
    // "super-admin" -> "Super Admin", "basic-user" -> "Basic User"
    return user.role
      .replaceAll(/[-_]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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
        {/* Menu Toggle Button */}
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

        {/* Logo */}
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

      {/* Desktop and Mobile: Right Side Actions */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          gap: { xs: "12px", md: "24px" },
          marginLeft: { xs: 0, md: "auto" },
        }}
      >
        {/* Refresh Button */}
        <Tooltip title={"Refresh"} placement="top">
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
              "&:hover": {
                backgroundColor: "#FAFAFA",
              },
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
        <Tooltip title={"Notifications"} placement="top">
          <Box
            onClick={handleNotifications}
            sx={{
              width: "28px",
              height: "28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              transition: "background-color 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#FAFAFA",
              },
            }}
            aria-label="notifications"
          >
            <Box
              component="img"
              src={NotificationsIcon}
              alt="notifications"
              sx={{ width: "28px", height: "28px" }}
            />
          </Box>
        </Tooltip>

        {/* User Profile Section */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            sx={{
              width: { md: "40px", lg: "47px" },
              height: { md: "40px", lg: "47px" },
              backgroundColor: "#3266CC",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            {getInitials()}
          </Avatar>

          {/* User Info */}
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
              {getDisplayName()}
            </Typography>

            {/* Role Badge */}
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
                {getRole()}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Mobile: Avatar only */}
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
          {getInitials()}
        </Avatar>
      </Stack>
    </Box>
  );
};

export default Navbar;
