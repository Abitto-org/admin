import { Box, InputBase, MenuItem, Select, Typography } from "@mui/material";
import { type FC, useState } from "react";
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

  if (!searchable && !filterable) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minWidth: { xs: "auto", lg: "408px" },
        width: { xs: "100%", sm: "auto" },
        borderRadius: "8px",
        gap: "10px",
        border: "1px solid #EAEAEA",
        paddingTop: "8px",
        paddingRight: "12px",
        paddingBottom: "8px",
        paddingLeft: "12px",
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
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#808080",
              "& input": {
                padding: 0,
                "&::placeholder": {
                  color: "#808080",
                  opacity: 1,
                },
              },
            }}
          />
        </>
      )}

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
    </Box>
  );
};

export default SearchFilter;
