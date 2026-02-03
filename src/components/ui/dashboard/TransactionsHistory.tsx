import {
  Box,
  Typography,
  InputBase,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { type FC, useState } from "react";
import SearchIcon from "@/assets/icons/search.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import LinkText from "./LinkText";

interface Transaction {
  id: string;
  timestamp: string;
  user: string;
  type: string;
  amount: string;
  gasUnit: string;
  status: "success" | "pending" | "failed";
}

// Mock data for demonstration
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

const TransactionsHistory: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // You can calculate this based on your data

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

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "success":
        return { bg: "#E8F5E9", text: "#2E7D32" };
      case "pending":
        return { bg: "#FFF9C4", text: "#F57F17" };
      case "failed":
        return { bg: "#FFEBEE", text: "#C62828" };
      default:
        return { bg: "#F5F5F5", text: "#424242" };
    }
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first 3, ellipsis, last 2
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
      }
    }
    return pages;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        padding: { xs: "16px", sm: "24px" },
        mt: { xs: 2, md: 3 },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: "16px", sm: "12px" },
          mb: "24px",
        }}
      >
        {/* Title */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#000000",
              mb: "4px",
            }}
          >
            Transactions
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#424242",
              mt: "12px",
            }}
          >
            Recent Activity
          </Typography>
        </Box>

        {/* Search and Filter Container */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: { xs: "auto", lg: "408px" },
            width: { xs: "100%", sm: "auto" },
            borderRadius: "8px",
            gap: "10px",
            border: "1px solid #EAEAEA",
            paddingTop: "8px",
            paddingRight: "12px",
            paddingBottom: "8px",
            paddingLeft: "12px",
          }}
        >
          <Box
            component="img"
            src={SearchIcon}
            alt="search"
            sx={{
              width: "20px",
              height: "20px",
              flexShrink: 0,
            }}
          />
          <InputBase
            placeholder="Search"
            sx={{
              flex: 1,
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#808080",
              "& input": {
                padding: 0,
                "&::placeholder": {
                  color: "#808080",
                  opacity: 1,
                },
              },
            }}
          />

          {/* Filter Button */}
          <Select
            defaultValue="filter"
            displayEmpty
            IconComponent={(props) => (
              <Box
                {...props}
                sx={{
                  width: "14px",
                  height: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 5.25L7 8.75L10.5 5.25"
                    stroke="#808080"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            )}
            sx={{
              height: "26px",
              borderRadius: "4px",
              padding: "4px",
              backgroundColor: "#FAFAFA",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#808080",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-select": {
                padding: "0 20px 0 4px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                minWidth: "60px",
              },
              "& .MuiSelect-icon": {
                right: "4px",
              },
            }}
            renderValue={() => (
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Box
                  component="img"
                  src={FilterIcon}
                  alt="filter"
                  sx={{ width: "16px", height: "16px" }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textTransform: "capitalize",
                    color: "#808080",
                  }}
                >
                  Filter
                </Typography>
              </Box>
            )}
          >
            <MenuItem value="filter">All</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Table Section */}
      <Box
        sx={{
          overflowX: "auto",
          borderRadius: "12px 12px 0 0",
          border: "1px solid #EAEAEA",
          mb: "24px",
        }}
      >
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: { xs: "800px", md: "100%" },
          }}
        >
          {/* Table Head */}
          <Box component="thead">
            <Box component="tr" sx={{ backgroundColor: "#FAFAFA" }}>
              <Box
                component="th"
                sx={{
                  paddingTop: "12px",
                  paddingRight: "16px",
                  paddingBottom: "12px",
                  paddingLeft: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #EAEAEA",
                  borderRight: "1px solid #EAEAEA",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#424242",
                }}
              >
                Timestamp
              </Box>
              <Box
                component="th"
                sx={{
                  paddingTop: "12px",
                  paddingRight: "16px",
                  paddingBottom: "12px",
                  paddingLeft: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #EAEAEA",
                  borderRight: "1px solid #EAEAEA",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#424242",
                }}
              >
                User
              </Box>
              <Box
                component="th"
                sx={{
                  paddingTop: "12px",
                  paddingRight: "16px",
                  paddingBottom: "12px",
                  paddingLeft: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #EAEAEA",
                  borderRight: "1px solid #EAEAEA",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#424242",
                }}
              >
                Type
              </Box>
              <Box
                component="th"
                sx={{
                  paddingTop: "12px",
                  paddingRight: "16px",
                  paddingBottom: "12px",
                  paddingLeft: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #EAEAEA",
                  borderRight: "1px solid #EAEAEA",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#424242",
                  minWidth: "120px", // Increased width for Amount column
                }}
              >
                Amount
              </Box>
              <Box
                component="th"
                sx={{
                  paddingTop: "12px",
                  paddingRight: "16px",
                  paddingBottom: "12px",
                  paddingLeft: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #EAEAEA",
                  borderRight: "1px solid #EAEAEA",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#424242",
                }}
              >
                Gas Unit
              </Box>
              <Box
                component="th"
                sx={{
                  paddingTop: "12px",
                  paddingRight: "16px",
                  paddingBottom: "12px",
                  paddingLeft: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #EAEAEA",
                  borderRight: "1px solid #EAEAEA",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#424242",
                }}
              >
                Status
              </Box>
              <Box
                component="th"
                sx={{
                  paddingTop: "12px",
                  paddingRight: "16px",
                  paddingBottom: "12px",
                  paddingLeft: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #EAEAEA",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#424242",
                }}
              >
                Action
              </Box>
            </Box>
          </Box>

          {/* Table Body */}
          <Box component="tbody">
            {mockTransactions.map((transaction, index) => {
              const statusColors = getStatusColor(transaction.status);
              const isLastRow = index === mockTransactions.length - 1;
              return (
                <Box component="tr" key={transaction.id}>
                  <Box
                    component="td"
                    sx={{
                      paddingTop: "30px",
                      paddingRight: "16px",
                      paddingBottom: "14px",
                      paddingLeft: "16px",
                      borderBottom: isLastRow ? "none" : "1px solid #EAEAEA",
                      borderRight: "1px solid #EAEAEA",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "150%",
                      letterSpacing: "0%",
                      color: "#0A0A0A",
                    }}
                  >
                    {transaction.timestamp}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      paddingTop: "14px",
                      paddingRight: "16px",
                      paddingBottom: "14px",
                      paddingLeft: "16px",
                      borderBottom: isLastRow ? "none" : "1px solid #EAEAEA",
                      borderRight: "1px solid #EAEAEA",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "150%",
                      letterSpacing: "0%",
                      color: "#0A0A0A",
                    }}
                  >
                    {transaction.user}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      paddingTop: "14px",
                      paddingRight: "16px",
                      paddingBottom: "14px",
                      paddingLeft: "16px",
                      borderBottom: isLastRow ? "none" : "1px solid #EAEAEA",
                      borderRight: "1px solid #EAEAEA",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "150%",
                      letterSpacing: "0%",
                      color: "#0A0A0A",
                    }}
                  >
                    {transaction.type}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      paddingTop: "14px",
                      paddingRight: "16px",
                      paddingBottom: "14px",
                      paddingLeft: "16px",
                      borderBottom: isLastRow ? "none" : "1px solid #EAEAEA",
                      borderRight: "1px solid #EAEAEA",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "150%",
                      letterSpacing: "0%",
                      color: "#0A0A0A",
                      minWidth: "120px", // Increased width for Amount column
                    }}
                  >
                    {transaction.amount}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      paddingTop: "14px",
                      paddingRight: "16px",
                      paddingBottom: "14px",
                      paddingLeft: "16px",
                      borderBottom: isLastRow ? "none" : "1px solid #EAEAEA",
                      borderRight: "1px solid #EAEAEA",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "150%",
                      letterSpacing: "0%",
                      color: "#0A0A0A",
                    }}
                  >
                    {transaction.gasUnit}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      paddingTop: "14px",
                      paddingRight: "16px",
                      paddingBottom: "14px",
                      paddingLeft: "16px",
                      borderBottom: isLastRow ? "none" : "1px solid #EAEAEA",
                      borderRight: "1px solid #EAEAEA",
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px 12px",
                        borderRadius: "12px",
                        backgroundColor: statusColors.bg,
                        fontWeight: 600,
                        fontSize: "12px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        textTransform: "capitalize",
                        color: statusColors.text,
                      }}
                    >
                      {transaction.status}
                    </Box>
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      paddingTop: "14px",
                      paddingRight: "16px",
                      paddingBottom: "14px",
                      paddingLeft: "16px",
                      borderBottom: isLastRow ? "none" : "1px solid #EAEAEA",
                    }}
                  >
                    <LinkText
                      text="View"
                      onClick={() => handleViewTransaction(index.toString())}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: "179px",
            borderRadius: "8px",
            gap: "10px",
            padding: "4px",
            backgroundColor: "#FAFAFA",
          }}
        >
          {getPaginationNumbers().map((page, index) => (
            <Box
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "24px",
                height: "24px",
                borderRadius: "8px",
                paddingTop: "4px",
                paddingRight: "8px",
                paddingBottom: "4px",
                paddingLeft: "8px",
                backgroundColor:
                  currentPage === page ? "#669900" : "transparent",
                color: currentPage === page ? "#FFFFFF" : "#000000",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "100%",
                cursor: typeof page === "number" ? "pointer" : "default",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    typeof page === "number" && currentPage !== page
                      ? "#E0E0E0"
                      : currentPage === page
                        ? "#669900"
                        : "transparent",
                },
              }}
            >
              {page}
            </Box>
          ))}
        </Box>
      </Box>

      {/* View All Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          onClick={handleViewAll}
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
          View All Transactions
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
      </Box>
    </Box>
  );
};

export default TransactionsHistory;
