import { type FC, useState } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";

interface TransactionsHistoryTableProps {
  showViewAllButton?: boolean;
}

interface Transaction {
  id: string;
  timestamp: string;
  user: string;
  type: string;
  amount: string;
  gasUnit: string;
  status: "success" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    timestamp: "20-08-2025 | 8:58am",
    user: "Chibuike Man",
    type: "Gas Purchase",
    amount: "₦ 50,000",
    gasUnit: "24.6 kg",
    status: "success",
  },
  {
    id: "2",
    timestamp: "20-08-2025 | 7:32am",
    user: "Adaeze Okafor",
    type: "Gas Purchase",
    amount: "₦ 30,000",
    gasUnit: "15.2 kg",
    status: "pending",
  },
  {
    id: "3",
    timestamp: "19-08-2025 | 6:15pm",
    user: "Emeka Johnson",
    type: "Gas Purchase",
    amount: "₦ 75,000",
    gasUnit: "38.5 kg",
    status: "failed",
  },
  {
    id: "4",
    timestamp: "19-08-2025 | 3:45pm",
    user: "Ngozi Eze",
    type: "Gas Purchase",
    amount: "₦ 40,000",
    gasUnit: "20.0 kg",
    status: "success",
  },
  {
    id: "5",
    timestamp: "19-08-2025 | 1:20pm",
    user: "Oluwaseun Balogun",
    type: "Gas Purchase",
    amount: "₦ 60,000",
    gasUnit: "30.8 kg",
    status: "success",
  },
  {
    id: "6",
    timestamp: "18-08-2025 | 11:05am",
    user: "Funmilayo Adebayo",
    type: "Gas Purchase",
    amount: "₦ 45,000",
    gasUnit: "22.5 kg",
    status: "pending",
  },
];

// Badge color configuration
const badgeConfig: BadgeConfig = {
  status: {
    success: { bg: "#E8F5E9", text: "#2E7D32" },
    pending: { bg: "#FFF9C4", text: "#F57F17" },
    failed: { bg: "#FFEBEE", text: "#EA0000" },
  },
};

const TransactionsHistoryTable: FC<TransactionsHistoryTableProps> = ({
  showViewAllButton,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleViewAll = () => {
    console.log("View all transactions clicked");
  };

  const handleViewTransaction = (id: string) => {
    console.log("View transaction:", id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic to fetch data for the selected page
  };

  const handleSearchChange = (value: string) => {
    console.log("Search:", value);
    // Add search logic here
  };

  const handleFilterChange = (value: string) => {
    console.log("Filter:", value);
    // Add filter logic here
  };

  // Column configuration
  const columns: Column<Transaction>[] = [
    {
      key: "timestamp",
      label: "Timestamp",
      minWidth: "160px",
    },
    {
      key: "user",
      label: "User",
      minWidth: "100px",
    },
    {
      key: "type",
      label: "Type",
      minWidth: "100px",
    },
    {
      key: "amount",
      label: "Amount",
      minWidth: "120px",
    },
    {
      key: "gasUnit",
      label: "Gas Unit",
      minWidth: "80px",
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
        <LinkText text="View" onClick={() => handleViewTransaction(row.id)} />
      ),
    },
  ];

  // Filter options
  const filterOptions = [
    { label: "All", value: "filter" },
    { label: "Success", value: "success" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
  ];

  return (
    <DataTable
      title="Transactions"
      subtitle="Recent Activity"
      columns={columns}
      data={mockTransactions}
      searchable
      searchPlaceholder="Search"
      onSearchChange={handleSearchChange}
      filterable
      filterOptions={filterOptions}
      onFilterChange={handleFilterChange}
      defaultFilterValue="filter"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      showViewAllButton={showViewAllButton}
      viewAllButtonText="View All Transactions"
      onViewAll={handleViewAll}
    />
  );
};

export default TransactionsHistoryTable;
