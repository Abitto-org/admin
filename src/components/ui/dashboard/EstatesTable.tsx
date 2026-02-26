// EstatesTable.tsx
import { type FC, useMemo } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";
import type {
  EstateTableRow,
  EstateStatusType,
  GetEstatesResponse,
  Estate,
} from "@/types/estates.types";
import { formatDate } from "@/utils";
import { Box } from "@mui/material";

const badgeConfig: BadgeConfig = {
  status: {
    active: { bg: "#E8F5E9", text: "#2E7D32" },
    inactive: { bg: "#FFEBEE", text: "#EA0000" },
  },
};

interface EstatesTableProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  data: GetEstatesResponse | undefined;
  isLoading: boolean;
  onViewEstate: (estate: Estate) => void;
}

const EstatesTable: FC<EstatesTableProps> = ({
  currentPage,
  onPageChange,
  onSearchChange,
  filterValue,
  onFilterChange,
  data,
  isLoading,
  onViewEstate,
}) => {
  const handleSearchChange = (value: string) => {
    onSearchChange(value);
  };

  const handleFilterChange = (value: string) => {
    onFilterChange(value);
    onPageChange(1);
  };

  const tableData: EstateTableRow[] = useMemo(() => {
    if (!data?.data?.estates) return [];

    return data.data.estates.map((estate) => {
      const getStatus = (totalMeters: string): EstateStatusType => {
        return Number.parseInt(totalMeters) > 0 ? "active" : "inactive";
      };

      return {
        id: estate.id,
        name: estate.name,
        address: estate.address,
        dateCreated: formatDate(estate.createdAt),
        totalMeters: estate.totalMeters,
        onlineMeters: estate.onlineMeters,
        status: getStatus(estate.totalMeters),
      };
    });
  }, [data]);

  const columns: Column<EstateTableRow>[] = [
    {
      key: "name",
      label: "Estate Name",
      minWidth: "180px",
    },
    {
      key: "address",
      label: "Location",
      minWidth: "250px",
      renderCell: (value) => (
        <Box
          sx={{
            maxWidth: "250px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Box>
      ),
    },
    {
      key: "dateCreated",
      label: "Date Created",
      minWidth: "160px",
    },
    {
      key: "totalMeters",
      label: "Total Meters",
      minWidth: "120px",
    },
    {
      key: "onlineMeters",
      label: "Online Meters",
      minWidth: "120px",
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
      renderCell: (_, row) => {
        const estate = data?.data?.estates.find((e) => e.id === row.id);
        return (
          <LinkText
            text="View"
            onClick={() => estate && onViewEstate(estate)}
            showIcon={false}
          />
        );
      },
    },
  ];

  const filterOptions = [
    { label: "All Estates", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <DataTable
      title="Estates"
      subtitle="All Registered Estates"
      columns={columns}
      data={tableData}
      searchable
      searchPlaceholder="Search by estate name or location"
      onSearchChange={handleSearchChange}
      filterable
      filterOptions={filterOptions}
      onFilterChange={handleFilterChange}
      defaultFilterValue={filterValue}
      currentPage={currentPage}
      totalPages={data?.data?.pagination?.totalPages || 1}
      onPageChange={onPageChange}
      isLoading={isLoading}
      skeletonRows={10}
    />
  );
};

export default EstatesTable;
