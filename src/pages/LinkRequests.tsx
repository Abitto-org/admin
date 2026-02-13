import { Box, Typography, Button, Stack } from "@mui/material";
import { type FC, useState, useMemo } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import StatCardSkeleton from "@/components/ui/dashboard/StatCardSkeleton";
import LinkRequestsTable from "@/components/ui/dashboard/LinkRequestsTable";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import { useGetLinkRequests } from "@/hooks/useLinkRequests";
import useDisclosure from "@/hooks/useDisclosure";
import CustomDrawer from "@/components/ui/drawers/CustomDrawer";
import LinkMeterForm from "@/components/ui/dashboard/LinkMeterForm";

const LinkRequests: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string>("all");

  const linkMeterDrawer = useDisclosure();

  // Prepare query params
  const queryParams = useMemo(() => {
    const params: {
      page: number;
      limit: number;
      search?: string;
      status?: "pending" | "approved" | "rejected";
    } = {
      page: currentPage,
      limit: 10,
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (filterValue === "pending") {
      params.status = "pending";
    } else if (filterValue === "approved") {
      params.status = "approved";
    } else if (filterValue === "rejected") {
      params.status = "rejected";
    }

    return params;
  }, [currentPage, searchQuery, filterValue]);

  // Fetch link requests data
  const { data, isLoading } = useGetLinkRequests(queryParams);
  console.log("Link requests data:", data);

  // Extract stats
  const stats = data?.data?.stats || {
    pendingLinkRequests: 0,
    linkRequestsToday: 0,
    totalLinkedMeters: 0,
    rejectedRequests: 0,
    rejectedToday: 0,
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
            Link Requests
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Review and manage pending device link requests
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
            lg: "repeat(3, 1fr)",
          },
          gap: "8px",
          mb: { xs: 2, md: 3 },
        }}
      >
        {isLoading ? (
          <>
            <StatCardSkeleton label="Awaiting Review" />
            <StatCardSkeleton label="Total Linked Meters" />
            <StatCardSkeleton label="Rejected Requests" />
          </>
        ) : (
          <>
            <StatCard
              label="Awaiting Review"
              value={stats.pendingLinkRequests.toString()}
              subtext={`${stats.linkRequestsToday} Requests Today`}
            />
            <StatCard
              label="Total Linked Meters"
              value={stats.totalLinkedMeters.toString()}
              subtext="Successfully linked meters"
              subtextColor="#2EAE4E"
            />
            <StatCard
              label="Rejected Requests"
              value={stats.rejectedRequests.toString()}
              subtext={`${stats.rejectedToday} Rejected Today`}
              subtextColor="#FF170A"
            />
          </>
        )}
      </Box>

      <LinkRequestsTable
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        data={data}
        isLoading={isLoading}
      />
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

export default LinkRequests;
