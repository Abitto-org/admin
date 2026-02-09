import { Box, Typography } from "@mui/material";
import { type FC } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import TransactionsHistory from "@/components/ui/dashboard/TransactionsHistoryTable";

const Transactions: FC = () => {
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
            Transactions
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Manage and monitor all registered transactions
          </Typography>
        </Box>
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
          label="Total Revenue"
          value="1,150"
          subtext="₦500,000 processed in the last 24hrs"
          subtextColor="#2EAE4E"
        />{" "}
        <StatCard
          label="Total Transactions"
          value="3,000"
          subtext="10% increase in the past month"
        />{" "}
        <StatCard
          label="Active Transactions Today"
          value="30 mins"
          subtext="100 transactions reversed"
        />
      </Box>
      <TransactionsHistory />
    </>
  );
};

export default Transactions;
