import { Box, Typography, Button, Skeleton } from "@mui/material";
import { type FC } from "react";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import SearchFilter from "./SearchFilter";
import Pagination from "./Pagination";
import { type DataTableProps } from "./types";

const DataTable: FC<DataTableProps> = ({
  title,
  subtitle,
  columns,
  data,
  searchable = false,
  searchPlaceholder = "Search",
  onSearchChange,
  filterable = false,
  filterOptions = [],
  onFilterChange,
  defaultFilterValue = "filter",
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showViewAllButton = false,
  viewAllButtonText = "View All",
  onViewAll,
  containerSx,
  isLoading = false,
  skeletonRows = 5,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        padding: { xs: "16px", sm: "24px" },
        mt: { xs: 2, md: 3 },
        ...containerSx,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: "16px", sm: "12px" },
          mb: "24px",
        }}
      >
        {/* Title */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#000000",
              mb: "4px",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#424242",
                mt: "12px",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Search and Filter */}
        {(searchable || filterable) && (
          <SearchFilter
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={onSearchChange}
            filterable={filterable}
            filterOptions={filterOptions}
            onFilterChange={onFilterChange}
            defaultFilterValue={defaultFilterValue}
          />
        )}
      </Box>

      {/* Table Section */}
      <Box
        sx={{
          overflowX: "auto",
          borderRadius: "12px 12px 0 0",
          border: "1px solid #EAEAEA",
          mb: "24px",
        }}
      >
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: { xs: "800px", md: "100%" },
          }}
        >
          {/* Table Head */}
          <Box component="thead">
            <Box component="tr" sx={{ backgroundColor: "#FAFAFA" }}>
              {columns.map((column, index) => (
                <Box
                  key={column.key}
                  component="th"
                  sx={{
                    paddingTop: "12px",
                    paddingRight: "16px",
                    paddingBottom: "12px",
                    paddingLeft: "16px",
                    textAlign: column.align || "left",
                    borderBottom: "1px solid #EAEAEA",
                    borderRight:
                      index === columns.length - 1
                        ? "none"
                        : "1px solid #EAEAEA",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textTransform: "capitalize",
                    color: "#424242",
                    width: column.width,
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Table Body */}
          <Box component="tbody">
            {isLoading ? (
              // Skeleton Loading Rows
              Array.from({ length: skeletonRows }).map((_, rowIndex) => {
                const isLastRow = rowIndex === skeletonRows - 1;
                return (
                  <Box component="tr" key={`skeleton-${rowIndex}`}>
                    {columns.map((column, colIndex) => (
                      <Box
                        key={`skeleton-${column.key}`}
                        component="td"
                        sx={{
                          paddingTop: colIndex === 0 ? "30px" : "14px",
                          paddingRight: "16px",
                          paddingBottom: "14px",
                          paddingLeft: "16px",
                          borderBottom: isLastRow
                            ? "none"
                            : "1px solid #EAEAEA",
                          borderRight:
                            colIndex === columns.length - 1
                              ? "none"
                              : "1px solid #EAEAEA",
                          textAlign: column.align || "left",
                          width: column.width,
                          minWidth: column.minWidth,
                        }}
                      >
                        <Skeleton
                          variant="text"
                          width={
                            column.key === "actions"
                              ? "60px"
                              : colIndex === 0
                                ? "120px"
                                : "80%"
                          }
                          height={20}
                          sx={{
                            bgcolor: "#F5F5F5",
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                );
              })
            ) : data.length === 0 ? (
              // Empty State
              <Box component="tr">
                <Box
                  component="td"
                  colSpan={columns.length}
                  sx={{
                    padding: "60px 16px",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "16px",
                      color: "#9E9E9E",
                    }}
                  >
                    No data available
                  </Typography>
                </Box>
              </Box>
            ) : (
              // Actual Data Rows
              data.map((row, rowIndex) => {
                const isLastRow = rowIndex === data.length - 1;
                return (
                  <Box component="tr" key={rowIndex}>
                    {columns.map((column, colIndex) => {
                      const cellValue = row[column.key];
                      return (
                        <Box
                          key={column.key}
                          component="td"
                          sx={{
                            paddingTop: colIndex === 0 ? "30px" : "14px",
                            paddingRight: "16px",
                            paddingBottom: "14px",
                            paddingLeft: "16px",
                            borderBottom: isLastRow
                              ? "none"
                              : "1px solid #EAEAEA",
                            borderRight:
                              colIndex === columns.length - 1
                                ? "none"
                                : "1px solid #EAEAEA",
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "150%",
                            letterSpacing: "0%",
                            color: "#0A0A0A",
                            textAlign: column.align || "left",
                            width: column.width,
                            minWidth: column.minWidth,
                          }}
                        >
                          {column.renderCell
                            ? column.renderCell(cellValue, row, rowIndex)
                            : cellValue}
                        </Box>
                      );
                    })}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </Box>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange || (() => {})}
        />
      )}

      {/* Skeleton for Pagination during loading */}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={280}
            height={40}
            sx={{
              borderRadius: "8px",
              bgcolor: "#F5F5F5",
            }}
          />
        </Box>
      )}

      {/* View All Button */}
      {showViewAllButton && !isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            onClick={onViewAll}
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
            {viewAllButtonText}
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
        </Box>
      )}
    </Box>
  );
};

export default DataTable;
