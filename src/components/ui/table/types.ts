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
  // Header
  title: string;
  subtitle?: string;

  // Data
  columns: Column<T>[];
  data: T[];

  // Search & Filter
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filterable?: boolean;
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;
  defaultFilterValue?: string;

  // Pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;

  // View All Button
  showViewAllButton?: boolean;
  viewAllButtonText?: string;
  onViewAll?: () => void;

  // Styling
  containerSx?: any;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchFilterProps {
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filterable?: boolean;
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;
  defaultFilterValue?: string;
}

export interface BadgeProps {
  type: string;
  value: string;
  config: BadgeConfig;
}
