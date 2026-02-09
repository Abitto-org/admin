import { Box, Typography, Button, Stack } from "@mui/material";
import { type FC } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import MetersTable from "@/components/ui/dashboard/MetersTable";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";

const Meters: FC = () => {
  const handleLinkMeter = () => {
    console.log("Link a meter clicked");
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
            Meters
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Monitor and Manage all Gas Meters
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
            xs: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "8px",
          mb: { xs: 2, md: 3 },
        }}
      >
        <StatCard
          label="Total Meters"
          value="209"
          subtext="Total Available Meters"
          subtextColor="#2EAE4E"
        />{" "}
        <StatCard
          label="Total Linked Meters"
          value="2000"
          subtext="75% of meters has been linked"
        />{" "}
        <StatCard
          label="Unlinked Meters"
          value="20"
          subtext="25% of meters has been unlinked"
        />
      </Box>
      <MetersTable />
    </>
  );
};

export default Meters;
