import { Box, Typography, Button, Stack } from "@mui/material";
import { type FC } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import UsersTable from "@/components/ui/dashboard/UsersTable";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import LinkText from "@/components/ui/dashboard/LinkText";

const Users: FC = () => {
  const handleLinkMeter = () => {
    console.log("Link a meter clicked");
  };
  const handleViewLinkRequest = () => {
    console.log("View link request clicked");
  };

  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: "24px", md: "16px" },
          mb: { xs: 2, md: 3 },
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
            Users
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Manage and monitor all registered users
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing="16px"
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            onClick={handleLinkMeter}
            sx={{
              height: "48px",
              borderRadius: "32px",
              padding: "12px 24px",
              backgroundColor: "#669900",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: { xs: "14px", sm: "16px" },
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
            Register New User
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
            xs: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "8px",
          mb: { xs: 2, md: 3 },
        }}
      >
        <StatCard
          label="Total Users"
          value="1,150"
          subtext="1 new users today"
          subtextColor="#2EAE4E"
        />{" "}
        <StatCard
          label="Users Without Linked Meters"
          value="290"
          subtext={
            <LinkText
              text="10% of Total Users"
              onClick={handleViewLinkRequest}
              iconGap="6px"
            />
          }
          subtextGap="6px"
        />{" "}
        <StatCard
          label="Active Users Today"
          value="300"
          subtext="300kg of gas bought today"
        />
      </Box>
      <UsersTable />
    </>
  );
};

export default Users;
