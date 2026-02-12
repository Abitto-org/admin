import { Box, Typography, Button, Stack } from "@mui/material";
import { type FC, useState, useMemo } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import StatCardSkeleton from "@/components/ui/dashboard/StatCardSkeleton";
import UsersTable from "@/components/ui/dashboard/UsersTable";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import LinkText from "@/components/ui/dashboard/LinkText";
import { useGetUsers } from "@/hooks/useUsers";

const Users: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string>("all");

  const handleRegisterUser = () => {
    console.log("Register new user clicked");
  };

  const handleViewLinkRequest = () => {
    console.log("View link request clicked");
  };

  // Prepare query params
  const queryParams = useMemo(() => {
    const params: {
      page: number;
      limit: number;
      search?: string;
      isActive?: boolean;
    } = {
      page: currentPage,
      limit: 10,
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (filterValue === "active") {
      params.isActive = true;
    } else if (filterValue === "inactive") {
      params.isActive = false;
    }

    return params;
  }, [currentPage, searchQuery, filterValue]);

  // Fetch users data
  const { data, isLoading } = useGetUsers(queryParams);
  console.log("Users data:", data);

  // Extract stats
  const stats = data?.data?.stats || {
    totalUsers: 0,
    joinedToday: 0,
    activeToday: 0,
    usersWithoutMeters: 0,
    totalKgBoughtToday: 0,
    percentageWithoutMeters: 0,
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
            onClick={handleRegisterUser}
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
        {isLoading ? (
          <>
            <StatCardSkeleton label="Total Users" />
            <StatCardSkeleton label="Users Without Linked Meters" />
            <StatCardSkeleton label="Active Users Today" />
          </>
        ) : (
          <>
            <StatCard
              label="Total Users"
              value={stats.totalUsers.toString()}
              subtext={`${stats.joinedToday} new user${stats.joinedToday === 1 ? "" : "s"} today`}
              subtextColor="#2EAE4E"
            />
            <StatCard
              label="Users Without Linked Meters"
              value={stats.usersWithoutMeters.toString()}
              subtext={
                <LinkText
                  text={`${stats.percentageWithoutMeters}% of Total Users`}
                  onClick={handleViewLinkRequest}
                  iconGap="6px"
                />
              }
              subtextGap="6px"
            />
            <StatCard
              label="Active Users Today"
              value={stats.activeToday.toString()}
              subtext={`${stats.totalKgBoughtToday}kg of gas bought today`}
            />
          </>
        )}
      </Box>

      <UsersTable
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        data={data}
        isLoading={isLoading}
      />
    </>
  );
};

export default Users;
