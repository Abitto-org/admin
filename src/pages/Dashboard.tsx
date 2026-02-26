import { Box, Typography, Button, Stack } from "@mui/material";
import { useMemo, useState, type FC } from "react";
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
import { useNavigate } from "react-router-dom";
import TransactionsHistoryTable from "@/components/ui/dashboard/TransactionsHistoryTable";
import { useGetTransactions } from "@/hooks/useTransactions";
import TransactionDrawer from "@/components/ui/drawers/TransactionDrawer";
import LinkMeterDrawer from "@/components/ui/drawers/LinkMeterDrawer";
import { useGetStats } from "@/hooks/useStats";
import StatCardSkeleton from "@/components/ui/dashboard/StatCardSkeleton";
import RegisterUserDrawer from "@/components/ui/drawers/RegisterUserDrawer";

const Dashboard: FC = () => {
  const navigate = useNavigate();

  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  // Drawers
  const registerUserDrawer = useDisclosure();
  const transactionDrawer = useDisclosure();
  const linkMeterDrawer = useDisclosure();

  const { data: statsData, isLoading: statsLoading } = useGetStats();
  const stats = statsData?.data;

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

  const handleViewTransaction = (id: string) => {
    setSelectedTransactionId(id);
    transactionDrawer.onOpen();
  };

  return (
    <>
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
        {statsLoading ? (
          <>
            <StatCardSkeleton label="Total Users" />
            <StatCardSkeleton label="Total Revenue" />
            <StatCardSkeleton label="Total Active Meters" />
            <StatCardSkeleton label="Total Gas Sold" />
          </>
        ) : (
          <>
            <StatCard
              label="Total Users"
              value={stats?.users.total.toString() ?? "0"}
              subtext={
                <TrendText
                  text={`+${stats?.users.increasePastMonth ?? 0} users this month`}
                />
              }
              subtextGap="4px"
            />

            <StatCard
              label="Total Revenue"
              value={`₦ ${Number(stats?.revenue.total ?? 0).toLocaleString()}`}
              subtext={
                <TrendText
                  text={`₦${Number(stats?.revenue.today ?? 0).toLocaleString()} today`}
                  color="#414141"
                />
              }
              action={<RangeSelect defaultValue="Today" />}
              subtextGap="4px"
            />

            <StatCard
              label="Total Active Meters"
              value={stats?.meters.active.toString() ?? "0"}
              subtext={
                <LinkText
                  text="View Link Requests"
                  onClick={handleViewLinkRequest}
                  iconGap="6px"
                />
              }
              subtextGap="6px"
            />

            <StatCard
              label="Total Gas Sold"
              value={`${Number(stats?.gasSold.totalKg ?? 0).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                },
              )} kg`}
              subtext={
                <TrendText
                  text={`${stats?.gasSold.todayKg ?? 0}kg gas sold today`}
                  showIcon={false}
                  color="#414141"
                />
              }
              subtextGap="4px"
            />
          </>
        )}
      </Box>

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
        onViewTransaction={handleViewTransaction}
      />

      <RegisterUserDrawer registerUserDrawer={registerUserDrawer} />
      <LinkMeterDrawer linkMeterDrawer={linkMeterDrawer} />
      <TransactionDrawer
        transactionDrawer={transactionDrawer}
        transactionId={selectedTransactionId}
      />
    </>
  );
};

export default Dashboard;
