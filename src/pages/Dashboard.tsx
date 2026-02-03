import { Box, Typography, Button, Stack } from "@mui/material";
import { type FC } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import TrendText from "@/components/ui/dashboard/TrendText";
import LinkText from "@/components/ui/dashboard/LinkText";
import RangeSelect from "@/components/ui/dashboard/RangeSelect";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";

const Dashboard: FC = () => {
  const handleRegisterUser = () => {
    console.log("Register new user clicked");
  };

  const handleLinkMeter = () => {
    console.log("Link a meter clicked");
  };

  const handleViewLinkRequest = () => {
    console.log("View link request clicked");
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: "24px", md: "16px" },
          mb: "32px",
        }}
      >
        {/* Title and Subtitle */}
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "24px", md: "32px" },
              lineHeight: "120%",
              color: "#000000",
              mb: "8px",
            }}
          >
            Dashboard
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Your control center for every activity
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing="16px"
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            onClick={handleRegisterUser}
            sx={{
              height: "48px",
              borderRadius: "32px",
              padding: "12px 24px",
              backgroundColor: "#FFFFFF",
              color: "#669900",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            Register New User
          </Button>

          <Button
            onClick={handleLinkMeter}
            sx={{
              height: "48px",
              borderRadius: "32px",
              padding: "12px 24px",
              backgroundColor: "#669900",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#558000",
              },
            }}
          >
            Link a Meter
            <Box
              component="img"
              src={ButtonArrowIcon}
              alt="arrow"
              sx={{
                width: "20px",
                height: "20px",
              }}
            />
          </Button>
        </Stack>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: "8px",
        }}
      >
        <StatCard
          label="Total Users"
          value="266"
          subtext={<TrendText text="+200 users this month" />}
        />

        <StatCard
          label="Total Revenue"
          value="₦ 790,000"
          subtext={<TrendText text="₦20,000 today" />}
          action={<RangeSelect defaultValue="Today" />}
        />

        <StatCard
          label="Total Active Meters"
          value="500"
          subtext={
            <LinkText
              text="View Link Request"
              onClick={handleViewLinkRequest}
            />
          }
        />

        <StatCard
          label="Total Gas Sold"
          value="5,000 kg"
          subtext={
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#414141",
              }}
            >
              10kg gas sold today
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
