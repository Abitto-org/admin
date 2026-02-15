/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BadgeConfig {
  [key: string]: {
    [value: string]: {
      bg: string;
      text: string;
    };
  };
}

export interface Column<T = any> {
  key: string;
  label: string;
  width?: string | number;
  minWidth?: string | number;
  align?: "left" | "center" | "right";
  renderCell?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface DataTableProps<T = any> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filterable?: boolean;
  filterOptions?: { label: string; value: string }[];
  onFilterChange?: (value: string) => void;
  defaultFilterValue?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showViewAllButton?: boolean;
  viewAllButtonText?: string;
  onViewAll?: () => void;
  containerSx?: any;
  isLoading?: boolean;
  skeletonRows?: number;
  showDateFilters?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  onStartDateChange?: (date: Date | null) => void;
  onEndDateChange?: (date: Date | null) => void;
  showTypeFilter?: boolean;
  typeFilterOptions?: { label: string; value: string }[];
  typeFilterValue?: string;
  onTypeFilterChange?: (value: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// types.ts - Add these to your existing SearchFilterProps interface
export interface SearchFilterProps {
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filterable?: boolean;
  filterOptions?: { label: string; value: string }[];
  onFilterChange?: (value: string) => void;
  defaultFilterValue?: string;
  showDateFilters?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  onStartDateChange?: (date: Date | null) => void;
  onEndDateChange?: (date: Date | null) => void;
  showTypeFilter?: boolean;
  typeFilterOptions?: { label: string; value: string }[];
  typeFilterValue?: string;
  onTypeFilterChange?: (value: string) => void;
}

export interface BadgeProps {
  type: string;
  value: string;
  config: BadgeConfig;
}
