import { Box, Typography } from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import DashboardImage from "@/assets/dashboard-1.png";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      display="flex"
      height="100vh"
      sx={
        {
          // overflow: "hidden",
        }
      }
    >
      {/* Left Sidebar - 42% width, max 606px */}
      <Box
        sx={{
          width: "50%",
          maxWidth: "656px",
          backgroundColor: "#669900",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "center",
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            component="img"
            src={DashboardImage}
            alt="Dashboard"
            sx={{
              height: "auto",
              width: "60%",
              objectFit: "cover",
              mt: 4,
            }}
          />
        </Box>

        <Box maxWidth="436px" px={4}>
          <Typography
            color="white"
            fontSize="42px"
            lineHeight="46px"
            fontWeight={700}
            mb={2}
          >
            Manage meter usage, users and operations.
          </Typography>

          <Typography
            color="white"
            fontSize="14px"
            lineHeight="20px"
            fontWeight={400}
          >
            Log in to access your dashboard, monitor performance, and keep the
            platform running smoothly.
          </Typography>
        </Box>
      </Box>

      {/* Right Content Area - Remaining space */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 4 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
