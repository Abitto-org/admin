import { Box, Typography } from "@mui/material";
import { type FC, useState, useMemo } from "react";
import IncidentsTable from "@/components/ui/dashboard/IncidentsTable";
import IncidentDrawer from "@/components/ui/drawers/IncidentsDrawer";
import { useGetIncidents } from "@/hooks/useIncidents";
import useDisclosure from "@/hooks/useDisclosure";
import type {
  GetIncidentsParams,
  IncidentReportItem,
} from "@/types/incidents.types";

const Incidents: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedIncident, setSelectedIncident] =
    useState<IncidentReportItem | null>(null);

  const incidentDrawer = useDisclosure();

  const queryParams: GetIncidentsParams = useMemo(() => {
    const params: GetIncidentsParams = {
      page: currentPage,
      limit: 10,
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (statusFilter !== "all") {
      params.status = statusFilter as "detected" | "resolved";
    }

    if (typeFilter !== "all") {
      params.type = typeFilter as "leakage_detection" | "device_tampering";
    }

    return params;
  }, [currentPage, searchQuery, statusFilter, typeFilter]);

  const { data, isLoading } = useGetIncidents(queryParams);

  const handleViewIncident = (item: IncidentReportItem) => {
    setSelectedIncident(item);
    incidentDrawer.onOpen();
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
            Incidents
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Manage and monitor all gas incidents
          </Typography>
        </Box>
      </Box>

      <IncidentsTable
        data={data}
        isLoading={isLoading}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onViewIncident={handleViewIncident}
      />

      <IncidentDrawer
        incidentDrawer={incidentDrawer}
        incident={selectedIncident}
      />
    </>
  );
};

export default Incidents;
