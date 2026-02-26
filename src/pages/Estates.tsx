// Estates.tsx
import { Box, Typography, Button, Stack } from "@mui/material";
import { type FC, useState, useMemo } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import StatCardSkeleton from "@/components/ui/dashboard/StatCardSkeleton";
import EstatesTable from "@/components/ui/dashboard/EstatesTable";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import { useGetEstates } from "@/hooks/useEstates";
import useDisclosure from "@/hooks/useDisclosure";
import AddEstateDrawer from "@/components/ui/drawers/AddEstateDrawer";
import EstateDetailsDrawer from "@/components/ui/drawers/EstateDetailsDrawer";
import type { Estate } from "@/types/estates.types";

const Estates: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string>("all");
  const [selectedEstate, setSelectedEstate] = useState<Estate | undefined>();

  const addEstateDrawer = useDisclosure();
  const estateDetailsDrawer = useDisclosure();

  const queryParams = useMemo(() => {
    const params: {
      page: number;
      limit: number;
      search?: string;
    } = {
      page: currentPage,
      limit: 10,
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    return params;
  }, [currentPage, searchQuery]);

  const { data, isLoading } = useGetEstates(queryParams);

  const stats = data?.data?.stats || {
    totalEstates: 0,
    totalMetersOnline: 0,
    inactiveEstates: 0,
  };

  const handleViewEstate = (estate: Estate) => {
    setSelectedEstate(estate);
    estateDetailsDrawer.onOpen();
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
            Estates
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Monitor and Manage all Estates
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing="16px"
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            onClick={addEstateDrawer.onOpen}
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
            Add New Estate
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
            <StatCardSkeleton label="Total Estates" />
            <StatCardSkeleton label="Total Meters Online" />
            <StatCardSkeleton label="Inactive Estates" />
          </>
        ) : (
          <>
            <StatCard
              label="Total Estates"
              value={stats.totalEstates.toString()}
              subtext="Registered estates"
              subtextColor="#2EAE4E"
            />
            <StatCard
              label="Total Meters Online"
              value={stats.totalMetersOnline.toString()}
              subtext="Active meters across all estates"
            />
            <StatCard
              label="Inactive Estates"
              value={stats.inactiveEstates.toString()}
              subtext="Estates with no meters"
              subtextColor="#FF170A"
            />
          </>
        )}
      </Box>

      <EstatesTable
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        data={data}
        isLoading={isLoading}
        onViewEstate={handleViewEstate}
      />

      <AddEstateDrawer addEstateDrawer={addEstateDrawer} />
      <EstateDetailsDrawer
        estateDetailsDrawer={estateDetailsDrawer}
        estateData={selectedEstate}
      />
    </>
  );
};

export default Estates;
