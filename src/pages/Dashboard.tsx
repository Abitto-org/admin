import { Box, Typography, Button, Stack } from "@mui/material";
import { useMemo, type FC } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import TrendText from "@/components/ui/dashboard/TrendText";
import LinkText from "@/components/ui/dashboard/LinkText";
import RangeSelect from "@/components/ui/dashboard/RangeSelect";
import TotalUsageChart from "@/components/ui/dashboard/TotalUsageChart";
import MeterComparisonChart from "@/components/ui/dashboard/MeterComparisonChart";
import RecentActivity from "@/components/ui/dashboard/RecentActivity";
import LinkRequest from "@/components/ui/dashboard/LinkRequest";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import useDisclosure from "@/hooks/useDisclosure";
import CustomDrawer from "@/components/ui/drawers/CustomDrawer";
import { useNavigate } from "react-router-dom";
import LinkMeterForm from "@/components/ui/dashboard/LinkMeterForm";
import TransactionsHistoryTable from "@/components/ui/dashboard/TransactionsHistoryTable";
import { useGetTransactions } from "@/hooks/useTransactions";

const Dashboard: FC = () => {
  const registerUserDrawer = useDisclosure();
  const linkMeterDrawer = useDisclosure();
  const navigate = useNavigate();

  // Fetch only recent transactions for dashboard (limit 8)
  const queryParams = useMemo(
    () => ({
      page: 1,
      limit: 8,
    }),
    [],
  );

  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetTransactions(queryParams);

  const handleViewLinkRequest = () => {
    navigate("/link-requests");
  };

  const handleViewAllTransactions = () => {
    navigate("/transactions");
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
          direction="row"
          spacing="16px"
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            onClick={registerUserDrawer.onOpen}
            sx={{
              height: "48px",
              borderRadius: "32px",
              padding: "12px 24px",
              backgroundColor: "#FFFFFF",
              color: "#669900",
              fontWeight: 600,
              fontSize: { xs: "14px", sm: "16px" },
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
            onClick={linkMeterDrawer.onOpen}
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
            lg: "repeat(4, 1fr)",
          },
          gap: "8px",
          mb: { xs: 2, md: 3 },
        }}
      >
        {/* Card 1: Default TrendText (works exactly like before!) */}
        <StatCard
          label="Total Users"
          value="266"
          subtext={<TrendText text="+200 users this month" />}
          subtextGap="4px"
        />

        {/* Card 2: TrendText with custom color + Action component */}
        <StatCard
          label="Total Revenue"
          value="₦ 790,000"
          subtext={<TrendText text="₦20,000 today" color="#414141" />}
          action={<RangeSelect defaultValue="Today" />}
          subtextGap="4px"
        />

        {/* Card 3: LinkText with larger gap (icon feels more separate) */}
        <StatCard
          label="Total Active Meters"
          value="500"
          subtext={
            <LinkText
              text="View Link Requests"
              onClick={handleViewLinkRequest}
              iconGap="6px" // Larger gap for the trailing icon
            />
          }
          subtextGap="6px" // Match the larger gap
        />

        {/* Card 4: Plain text without icon */}
        <StatCard
          label="Total Gas Sold"
          value="5,000 kg"
          subtext={
            <TrendText
              text="10kg gas sold today"
              showIcon={false}
              color="#414141"
            />
          }
          subtextGap="4px"
        />
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "60% 40%",
          },
          gap: "10px",
          mb: { xs: 2, md: 3 },
        }}
      >
        <TotalUsageChart />
        <MeterComparisonChart />
      </Box>

      {/* Recent Activity and Link Request Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "40% 1fr",
          },
          gap: "10px",
        }}
      >
        <RecentActivity />
        <LinkRequest />
      </Box>

      {/* Transactions History Section */}
      <TransactionsHistoryTable
        mode="widget"
        data={transactionsData}
        isLoading={transactionsLoading}
        showViewAllButton={true}
        onViewAll={handleViewAllTransactions}
      />

      {/* Register User Drawer */}
      <CustomDrawer
        open={registerUserDrawer.open}
        onClose={registerUserDrawer.onClose}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Register New User
          </Typography>
          {/* Add your register user form content here */}
          <Typography>Register user form goes here...</Typography>
        </Box>
      </CustomDrawer>

      {/* Link Meter Drawer */}
      <CustomDrawer
        open={linkMeterDrawer.open}
        onClose={linkMeterDrawer.onClose}
      >
        <LinkMeterForm
          onClose={linkMeterDrawer.onClose}
          open={linkMeterDrawer.open}
        />
      </CustomDrawer>
    </>
  );
};

export default Dashboard;
