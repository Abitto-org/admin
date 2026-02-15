import { Box, InputBase, MenuItem, Select, Typography } from "@mui/material";
import { type FC, useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CategoryIcon from "@mui/icons-material/Category";
import SearchIcon from "@/assets/icons/search.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import { type SearchFilterProps } from "./types";

const SearchFilter: FC<SearchFilterProps> = ({
  searchable = true,
  searchPlaceholder = "Search",
  onSearchChange,
  filterable = true,
  filterOptions = [],
  onFilterChange,
  defaultFilterValue = "filter",
  showDateFilters = false,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  showTypeFilter = false,
  typeFilterOptions = [],
  typeFilterValue = "all",
  onTypeFilterChange,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState(defaultFilterValue);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange?.(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    onFilterChange?.(value);
  };

  if (!searchable && !filterable && !showDateFilters && !showTypeFilter) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minWidth: { xs: "auto", lg: "408px" },
        width: { xs: "100%", lg: "auto" },
        borderRadius: "8px",
        gap: "10px",
        border: "1px solid #EAEAEA",
        paddingTop: "8px",
        paddingRight: "12px",
        paddingBottom: "8px",
        paddingLeft: "12px",
        backgroundColor: "#FFFFFF",
        flexWrap: "wrap",
      }}
    >
      {searchable && (
        <>
          <Box
            component="img"
            src={SearchIcon}
            alt="search"
            sx={{
              width: "20px",
              height: "20px",
              flexShrink: 0,
            }}
          />
          <InputBase
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{
              flex: 1,
              minWidth: "150px",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#808080",
              "& input": {
                padding: 0,
                "&::placeholder": {
                  color: "#808080",
                  opacity: 1,
                  textTransform: "none",
                },
              },
            }}
          />
        </>
      )}

      {/* Main Status Filter */}
      {filterable && filterOptions.length > 0 && (
        <Select
          value={filterValue}
          onChange={(e) => handleFilterChange(e.target.value)}
          displayEmpty
          IconComponent={(props) => (
            <Box
              {...props}
              sx={{
                width: "14px",
                height: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 5.25L7 8.75L10.5 5.25"
                  stroke="#808080"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          )}
          sx={{
            height: "26px",
            borderRadius: "4px",
            padding: "4px",
            backgroundColor: "#FAFAFA",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textTransform: "capitalize",
            color: "#808080",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSelect-select": {
              padding: "0 20px 0 4px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minWidth: "60px",
            },
            "& .MuiSelect-icon": {
              right: "4px",
            },
          }}
          renderValue={() => (
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Box
                component="img"
                src={FilterIcon}
                alt="filter"
                sx={{ width: "16px", height: "16px" }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#808080",
                }}
              >
                Filter
              </Typography>
            </Box>
          )}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}

      {/* Type Filter */}
      {showTypeFilter && typeFilterOptions.length > 0 && (
        <Select
          value={typeFilterValue}
          onChange={(e) => onTypeFilterChange?.(e.target.value)}
          displayEmpty
          IconComponent={(props) => (
            <Box
              {...props}
              sx={{
                width: "14px",
                height: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 5.25L7 8.75L10.5 5.25"
                  stroke="#808080"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          )}
          sx={{
            height: "26px",
            borderRadius: "4px",
            padding: "4px",
            backgroundColor: "#FAFAFA",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textTransform: "capitalize",
            color: "#808080",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSelect-select": {
              padding: "0 20px 0 4px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minWidth: "80px",
            },
            "& .MuiSelect-icon": {
              right: "4px",
            },
          }}
          renderValue={() => (
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <CategoryIcon
                sx={{
                  width: "16px",
                  height: "16px",
                  color: "#808080",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#808080",
                }}
              >
                Type
              </Typography>
            </Box>
          )}
        >
          {typeFilterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}

      {/* Date Filters */}
      {showDateFilters && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={startDate}
            onChange={onStartDateChange}
            slotProps={{
              textField: {
                size: "small",
                placeholder: "Start",
                InputLabelProps: { shrink: false },
                sx: {
                  minWidth: "120px",
                  "& .MuiOutlinedInput-root": {
                    height: "26px",
                    minHeight: "26px",
                    borderRadius: "4px",
                    padding: "0 4px",
                    backgroundColor: "#FAFAFA",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#808080",
                    "& fieldset": {
                      border: "none",
                    },
                    "& input": {
                      padding: "0 4px",
                      height: "26px",
                      minWidth: "50px",
                      "&::placeholder": {
                        color: "#808080",
                        opacity: 1,
                        fontSize: "14px",
                      },
                    },
                  },
                  "& .MuiInputLabel-root": {
                    display: "none",
                  },
                  "& .MuiInputAdornment-root": {
                    marginLeft: 0,
                  },
                },
              },
              openPickerIcon: {
                fontSize: "small",
              },
              openPickerButton: {
                sx: {
                  padding: "0",
                  marginRight: 0,
                  width: "20px",
                  height: "20px",
                  "& .MuiSvgIcon-root": {
                    width: "16px",
                    height: "16px",
                    color: "#808080",
                  },
                },
              },
            }}
          />
          <DatePicker
            value={endDate}
            onChange={onEndDateChange}
            slotProps={{
              textField: {
                size: "small",
                placeholder: "End",
                InputLabelProps: { shrink: false },
                sx: {
                  minWidth: "120px",
                  "& .MuiOutlinedInput-root": {
                    height: "26px",
                    minHeight: "26px",
                    borderRadius: "4px",
                    padding: "0 4px",
                    backgroundColor: "#FAFAFA",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#808080",
                    "& fieldset": {
                      border: "none",
                    },
                    "& input": {
                      padding: "0 4px",
                      height: "26px",
                      minWidth: "50px",
                      "&::placeholder": {
                        color: "#808080",
                        opacity: 1,
                        fontSize: "14px",
                      },
                    },
                  },
                  "& .MuiInputLabel-root": {
                    display: "none",
                  },
                  "& .MuiInputAdornment-root": {
                    marginLeft: 0,
                  },
                },
              },
              openPickerIcon: {
                fontSize: "small",
              },
              openPickerButton: {
                sx: {
                  padding: "0",
                  marginRight: 0,
                  width: "20px",
                  height: "20px",
                  "& .MuiSvgIcon-root": {
                    width: "16px",
                    height: "16px",
                    color: "#808080",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      )}
    </Box>
  );
};

export default SearchFilter;
