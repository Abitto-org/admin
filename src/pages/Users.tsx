import { Box, Typography, Button, Stack } from "@mui/material";
import { type FC, useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StatCard from "@/components/ui/dashboard/StatCard";
import StatCardSkeleton from "@/components/ui/dashboard/StatCardSkeleton";
import UsersTable from "@/components/ui/dashboard/UsersTable";
import UserDrawer from "@/components/ui/drawers/UserDrawer";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import LinkText from "@/components/ui/dashboard/LinkText";
import { useGetUsers } from "@/hooks/useUsers";
import useDisclosure from "@/hooks/useDisclosure";
import type { User } from "@/types/users.types";
import RegisterUserDrawer from "@/components/ui/drawers/RegisterUserDrawer";

const Users: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const registerUserDrawer = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const userDrawer = useDisclosure();

  const queryParams = useMemo(() => {
    const params: {
      page: number;
      limit: number;
      search?: string;
      isActive?: boolean;
    } = { page: currentPage, limit: 10 };

    if (searchQuery) params.search = searchQuery;
    if (filterValue === "active") params.isActive = true;
    else if (filterValue === "inactive") params.isActive = false;

    return params;
  }, [currentPage, searchQuery, filterValue]);

  const { data, isLoading } = useGetUsers(queryParams);

  // When the URL has a userId and we have user data, open the drawer
  // Only open from URL on initial load — do not re-open when actively closing
  useEffect(() => {
    if (userId && data?.data?.users && !userDrawer.open) {
      const user = data.data.users.find((u) => u.id === userId);
      if (user) {
        queueMicrotask(() => {
          setSelectedUser(user);
          userDrawer.onOpen();
        });
      }
    }
  }, [userId, data?.data?.users]);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    userDrawer.onOpen();
    navigate(`/users/${user.id}`);
  };

  // FIX 1: clear selectedUser so drawer content resets on any close trigger
  const handleCloseDrawer = () => {
    userDrawer.onClose();
    setSelectedUser(null);
    navigate("/users");
  };

  const handleRegisterUser = () => {
    registerUserDrawer.onOpen();
  };

  const handleViewLinkRequest = () => {
    console.log("View link request clicked");
  };

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

        <Stack
          direction="row"
          spacing="16px"
          sx={{ width: { xs: "100%", sm: "auto" } }}
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
              "&:hover": { backgroundColor: "#558000" },
            }}
          >
            Register New User
            <Box
              component="img"
              src={ButtonArrowIcon}
              alt="arrow"
              sx={{ width: "20px", height: "20px" }}
            />
          </Button>
        </Stack>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
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
        onViewUser={handleViewUser}
      />

      {/* FIX 2: pass onClose explicitly so backdrop click goes through handleCloseDrawer */}
      <UserDrawer
        userDrawer={userDrawer}
        user={selectedUser}
        onClose={handleCloseDrawer}
      />
      <RegisterUserDrawer registerUserDrawer={registerUserDrawer} />
    </>
  );
};

export default Users;
