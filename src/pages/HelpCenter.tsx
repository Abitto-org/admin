import { Box, Typography } from "@mui/material";
import { type FC, useState } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import AllTickets from "@/components/ui/dashboard/AllTickets";

const HelpCenter: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const ticketsData = [
    {
      type: "Payment Failure",
      priority: "high" as const,
      fullName: "John Doe",
      email: "john.doe@example.com",
      issueType: "Transaction Error",
      date: "Feb 8, 2026",
      status: "unreplied" as const,
    },
    {
      type: "Account Access",
      priority: "medium" as const,
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      issueType: "Login Issues",
      date: "Feb 8, 2026",
      status: "in progress" as const,
    },
    {
      type: "Billing Query",
      priority: "low" as const,
      fullName: "Mike Johnson",
      email: "mike.j@example.com",
      issueType: "Invoice Request",
      date: "Feb 7, 2026",
      status: "success" as const,
    },
    {
      type: "Technical Issue",
      priority: "high" as const,
      fullName: "Sarah Williams",
      email: "sarah.w@example.com",
      issueType: "App Crash",
      date: "Feb 8, 2026",
      status: "unreplied" as const,
    },
    {
      type: "Feature Request",
      priority: "low" as const,
      fullName: "David Brown",
      email: "david.brown@example.com",
      issueType: "Enhancement",
      date: "Feb 7, 2026",
      status: "in progress" as const,
    },
    {
      type: "Payment Failure",
      priority: "high" as const,
      fullName: "Emily Davis",
      email: "emily.d@example.com",
      issueType: "Card Declined",
      date: "Feb 8, 2026",
      status: "success" as const,
    },
  ];

  const filterOptions = [
    { label: "All Tickets", value: "all" },
    { label: "High Priority", value: "high" },
    { label: "Medium Priority", value: "medium" },
    { label: "Low Priority", value: "low" },
    { label: "Unreplied", value: "unreplied" },
    { label: "In Progress", value: "in progress" },
    { label: "Resolved", value: "success" },
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    console.log(searchQuery);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewTicket = (ticket: any, index: number) => {
    console.log("Viewing ticket:", ticket, "at index:", index);
    // Add your navigation or modal logic here
  };

  const handleViewAll = () => {
    console.log("View all tickets clicked");
    // Add your navigation logic here
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
            Help Center
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Manage and resolve customer issues
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
          label="Open Tickets"
          value="50"
          subtext="10 new tickets in the past hour!"
          subtextColor="#FF170A"
        />
        <StatCard
          label="Tickets Today"
          value="300"
          subtext="10% increase in the past 24hrs"
        />
        <StatCard
          label="Resolved Today"
          value="250"
          subtext="Average resolve time of 20 minutes"
        />
      </Box>

      {/* All Tickets Section */}
      <AllTickets
        title="All Tickets"
        subtitle="View and manage all support tickets"
        data={ticketsData}
        searchable
        searchPlaceholder="Search tickets..."
        onSearchChange={handleSearchChange}
        filterable
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        defaultFilterValue={filterValue}
        currentPage={currentPage}
        totalPages={3}
        onPageChange={handlePageChange}
        showViewAllButton
        viewAllButtonText="View All Tickets"
        onViewAll={handleViewAll}
        onViewTicket={handleViewTicket}
      />
    </>
  );
};

export default HelpCenter;
