import { Box, Avatar, Typography, Stack } from "@mui/material";
import { type FC } from "react";
import RefreshIcon from "@/assets/icons/refresh.svg";
import NotificationsIcon from "@/assets/icons/notifications.svg";

interface NavbarProps {
  user?: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  const userData = user || {
    firstName: "John",
    lastName: "Doe",
    role: "Admin",
  };

  const handleRefresh = () => {
    console.log("Refresh clicked");
    // Implement refresh logic
  };

  const handleNotifications = () => {
    console.log("Notifications clicked");
    // Implement notifications logic
  };

  const getInitials = () => {
    return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: { xs: "12px 16px", md: "16px 24px" },
        borderBottom: { xs: "1px solid #ECECEC", md: "none" },
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          gap: { xs: "16px", md: "24px" },
        }}
      >
        {/* Refresh Button */}
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

        {/* Notifications Button */}
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
              width: "47px",
              height: "47px",
              backgroundColor: "#3266CC",
              fontFamily: "Geist, sans-serif",
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
                fontFamily: "Geist, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#000000",
              }}
            >
              {userData.firstName} {userData.lastName}
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
                  fontFamily: "Geist, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#669900",
                }}
              >
                {userData.role}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Mobile: Avatar only */}
        <Avatar
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: "#3266CC",
            fontFamily: "Geist, sans-serif",
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
