import { type FC, useMemo } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";
import type {
  IncidentTableRow,
  IncidentType,
  GetIncidentsResponse,
  IncidentReportItem,
} from "@/types/incidents.types";
import { formatDate } from "@/utils";

const badgeConfig: BadgeConfig = {
  status: {
    detected: { bg: "#FFEBEE", text: "#EA0000" },
    resolved: { bg: "#E8F5E9", text: "#2E7D32" },
  },
  type: {
    leakage_detection: { bg: "#FFF3E0", text: "#E65100" },
    device_tampering: { bg: "#FCE4EC", text: "#880E4F" },
  },
  severity: {
    high: { bg: "#FFEBEE", text: "#EA0000" },
    medium: { bg: "#FFF9C4", text: "#F57F17" },
  },
};

const SEVERITY_MAP: Record<IncidentType, "high" | "medium"> = {
  leakage_detection: "high",
  device_tampering: "medium",
};

interface IncidentsTableProps {
  data: GetIncidentsResponse | undefined;
  isLoading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  onViewIncident: (item: IncidentReportItem) => void;
}

const IncidentsTable: FC<IncidentsTableProps> = ({
  data,
  isLoading,
  currentPage,
  onPageChange,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  onViewIncident,
}) => {
  const tableData: IncidentTableRow[] = useMemo(() => {
    if (!data?.data?.reports) return [];

    return data.data.reports.map((item) => {
      const { report, meter, user } = item;
      const incidentType = report.type as IncidentType;

      return {
        id: report.id,
        date: report.detectedAt
          ? formatDate(report.detectedAt)
          : formatDate(report.createdAt),
        meterNumber: meter?.meterNumber ?? "N/A",
        deviceId: meter?.deviceId ? meter.deviceId.slice(0, 8) + "..." : "N/A",
        severity: SEVERITY_MAP[incidentType] ?? "medium",
        type: incidentType,
        user:
          user?.firstname || user?.lastname
            ? `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim()
            : "N/A",
        status: report.status,
        rawItem: item,
      };
    });
  }, [data]);

  const columns: Column<IncidentTableRow>[] = [
    {
      key: "date",
      label: "Date",
      minWidth: "160px",
    },
    {
      key: "meterNumber",
      label: "Meter ID",
      minWidth: "130px",
    },
    {
      key: "severity",
      label: "Severity",
      minWidth: "110px",
      renderCell: (value) => (
        <Badge type="severity" value={value} config={badgeConfig} />
      ),
    },
    {
      key: "type",
      label: "Type",
      minWidth: "170px",
      renderCell: (value) => (
        <Badge type="type" value={value} config={badgeConfig} />
      ),
    },
    {
      key: "user",
      label: "User",
      minWidth: "150px",
    },
    {
      key: "status",
      label: "Status",
      minWidth: "110px",
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
          onClick={() => onViewIncident(row.rawItem)}
          showIcon={false}
        />
      ),
    },
  ];

  const statusFilterOptions = [
    { label: "All Status", value: "all" },
    { label: "Detected", value: "detected" },
    { label: "Resolved", value: "resolved" },
  ];

  const typeFilterOptions = [
    { label: "All Types", value: "all" },
    { label: "Leakage Detection", value: "leakage_detection" },
    { label: "Device Tampering", value: "device_tampering" },
  ];

  const handleStatusFilter = (value: string) => {
    onStatusFilterChange(value);
    onPageChange(1);
  };

  const handleTypeFilter = (value: string) => {
    onTypeFilterChange(value);
    onPageChange(1);
  };

  return (
    <DataTable
      title="Incident Reports"
      subtitle="All detected incidents"
      columns={columns}
      data={tableData}
      searchable
      searchPlaceholder="Search by device ID or meter number"
      onSearchChange={(value) => {
        onSearchChange(value);
        onPageChange(1);
      }}
      filterable
      filterOptions={statusFilterOptions}
      onFilterChange={handleStatusFilter}
      defaultFilterValue={statusFilter}
      showTypeFilter
      typeFilterOptions={typeFilterOptions}
      typeFilterValue={typeFilter}
      onTypeFilterChange={handleTypeFilter}
      showDateFilters={false}
      currentPage={currentPage}
      totalPages={data?.data?.pagination?.totalPages || 1}
      onPageChange={onPageChange}
      isLoading={isLoading}
      skeletonRows={10}
    />
  );
};

export default IncidentsTable;
