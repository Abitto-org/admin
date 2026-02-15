// TransactionsHistoryTable.tsx - Simplified version
import { type FC, useMemo } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";
import type {
  TransactionTableRow,
  TransactionStatusType,
  GetTransactionsResponse,
  Transaction,
} from "@/types/transactions.types";
import { formatDate } from "@/utils";

const badgeConfig: BadgeConfig = {
  status: {
    success: { bg: "#E8F5E9", text: "#2E7D32" },
    pending: { bg: "#FFF9C4", text: "#F57F17" },
    failed: { bg: "#FFEBEE", text: "#EA0000" },
  },
};

interface TransactionsHistoryTableProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  data: GetTransactionsResponse | undefined;
  isLoading: boolean;
  onViewTransaction: (id: string) => void;
}

const TransactionsHistoryTable: FC<TransactionsHistoryTableProps> = ({
  currentPage,
  onPageChange,
  onSearchChange,
  filterValue,
  onFilterChange,
  typeFilter,
  onTypeFilterChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  data,
  isLoading,
  onViewTransaction,
}) => {
  const formatAmount = (amount: string) => {
    const numAmount = Number.parseFloat(amount);
    return `₦${(numAmount / 100).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getGasUnit = (transaction: Transaction): string => {
    if (transaction.type === "GAS_PURCHASE_ONLINE") {
      const metadata = transaction.metadata;
      if (metadata?.metadata?.kgPurchased) {
        return `${metadata.metadata.kgPurchased} kg`;
      }
      if (metadata?.kgPurchased) {
        return `${metadata.kgPurchased} kg`;
      }
    }
    return "N/A";
  };

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
  };

  const handleFilterChange = (value: string) => {
    onFilterChange(value);
    onPageChange(1);
  };

  const handleTypeFilterChange = (value: string) => {
    onTypeFilterChange(value);
    onPageChange(1);
  };

  const tableData: TransactionTableRow[] = useMemo(() => {
    if (!data?.data?.transactions) return [];

    return data.data.transactions.map((transaction) => {
      const getStatusForBadge = (status: string): TransactionStatusType => {
        if (status === "SUCCESS") return "success";
        if (status === "FAILED") return "failed";
        return "pending";
      };

      return {
        id: transaction.id,
        timestamp: formatDate(transaction.createdAt),
        user: transaction.userName || "N/A",
        type: transaction.type.replace(/_/g, " "),
        amount: formatAmount(transaction.amount),
        gasUnit: getGasUnit(transaction),
        status: getStatusForBadge(transaction.status),
        reference: transaction.reference,
      };
    });
  }, [data]);

  const columns: Column<TransactionTableRow>[] = [
    {
      key: "timestamp",
      label: "Timestamp",
      minWidth: "160px",
    },
    {
      key: "user",
      label: "User",
      minWidth: "150px",
    },
    {
      key: "type",
      label: "Type",
      minWidth: "180px",
    },
    {
      key: "amount",
      label: "Amount",
      minWidth: "120px",
    },
    {
      key: "gasUnit",
      label: "Gas Unit",
      minWidth: "100px",
    },
    {
      key: "status",
      label: "Status",
      renderCell: (value) => (
        <Badge type="status" value={value} config={badgeConfig} />
      ),
    },
    {
      key: "actions",
      label: "Action",
      renderCell: (_, row) => (
        <LinkText
          text="View"
          onClick={() => onViewTransaction(row.id)}
          showIcon={false}
        />
      ),
    },
  ];

  const statusFilterOptions = [
    { label: "All Status", value: "all" },
    { label: "Success", value: "SUCCESS" },
    { label: "Pending", value: "PENDING" },
    { label: "Failed", value: "FAILED" },
  ];

  const typeFilterOptions = [
    { label: "All Types", value: "all" },
    { label: "Gas Purchase", value: "GAS_PURCHASE_ONLINE" },
    { label: "Wallet Top-up", value: "WALLET_TOPUP" },
    { label: "Wallet Debit", value: "WALLET_DEBIT" },
  ];

  return (
    <DataTable
      title="Transactions"
      subtitle="Recent Activity"
      columns={columns}
      data={tableData}
      searchable
      searchPlaceholder="Search by reference, user, or description"
      onSearchChange={handleSearchChange}
      filterable
      filterOptions={statusFilterOptions}
      onFilterChange={handleFilterChange}
      defaultFilterValue={filterValue}
      showDateFilters={true}
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      showTypeFilter={true}
      typeFilterOptions={typeFilterOptions}
      typeFilterValue={typeFilter}
      onTypeFilterChange={handleTypeFilterChange}
      // Pagination
      currentPage={currentPage}
      totalPages={data?.data?.pagination?.totalPages || 1}
      onPageChange={onPageChange}
      isLoading={isLoading}
      skeletonRows={10}
    />
  );
};

export default TransactionsHistoryTable;
