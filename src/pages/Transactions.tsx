import { Box, Typography } from "@mui/material";
import { type FC, useState, useMemo } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import StatCardSkeleton from "@/components/ui/dashboard/StatCardSkeleton";
import TransactionsHistoryTable from "@/components/ui/dashboard/TransactionsHistoryTable";
import TransactionDrawer from "@/components/ui/drawers/TransactionDrawer";
import { useGetTransactions } from "@/hooks/useTransactions";
import useDisclosure from "@/hooks/useDisclosure";
import type { GetTransactionsParams } from "@/types/transactions.types";
import { formatAmount, formatTime } from "@/utils";

const Transactions: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const transactionDrawer = useDisclosure();

  const queryParams: GetTransactionsParams = useMemo(() => {
    const params: GetTransactionsParams = {
      page: currentPage,
      limit: 20,
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (filterValue !== "all") {
      params.status = filterValue as "SUCCESS" | "PENDING" | "FAILED";
    }

    if (typeFilter !== "all") {
      params.type = typeFilter as
        | "GAS_PURCHASE_ONLINE"
        | "WALLET_TOPUP"
        | "WALLET_DEBIT";
    }

    if (startDate) {
      params.startDate = startDate.toISOString();
    }

    if (endDate) {
      params.endDate = endDate.toISOString();
    }

    return params;
  }, [currentPage, searchQuery, filterValue, typeFilter, startDate, endDate]);

  const { data, isLoading } = useGetTransactions(queryParams);

  const stats = data?.data?.stats || {
    totalRevenue: 0,
    processedLast24hrs: 0,
    totalTransactions: 0,
    percentageIncreasePastMonth: 0,
    averageTransactionTimeSeconds: 0,
    totalFailedTransactions: 0,
  };

  const handleViewTransaction = (id: string) => {
    setSelectedTransactionId(id);
    transactionDrawer.onOpen();
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
        {isLoading ? (
          <>
            <StatCardSkeleton label="Total Revenue" />
            <StatCardSkeleton label="Total Transactions" />
            <StatCardSkeleton label="Average Transaction Time" />
          </>
        ) : (
          <>
            <StatCard
              label="Total Revenue"
              value={formatAmount(stats.totalRevenue)}
              subtext={`${formatAmount(stats.processedLast24hrs)} processed in the last 24hrs`}
              subtextColor="#2EAE4E"
            />
            <StatCard
              label="Total Transactions"
              value={stats.totalTransactions.toLocaleString()}
              subtext={`${stats.percentageIncreasePastMonth}% increase in the past month`}
            />
            <StatCard
              label="Average Transaction Time"
              value={formatTime(stats.averageTransactionTimeSeconds)}
              subtext={`${stats.totalFailedTransactions} transactions failed`}
              subtextColor="#FF170A"
            />
          </>
        )}
      </Box>

      <TransactionsHistoryTable
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        data={data}
        isLoading={isLoading}
        onViewTransaction={handleViewTransaction}
      />

      <TransactionDrawer
        transactionDrawer={transactionDrawer}
        transactionId={selectedTransactionId}
      />
    </>
  );
};

export default Transactions;
