import {  Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { type FC, useState } from "react";

interface RangeSelectProps {
  defaultValue?: string;
}

const RangeSelect: FC<RangeSelectProps> = ({ defaultValue = "Today" }) => {
  const [range, setRange] = useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setRange(event.target.value);
  };

  return (
    <Select
      value={range}
      onChange={handleChange}
      IconComponent={KeyboardArrowDown}
      sx={{
        maxWidth: "81px",
        height: "32px",
        borderRadius: "8px",
        backgroundColor: "#FAFAFA",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-select": {
          padding: "8px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "100%",
          color: "#414141",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "14px",
          color: "#414141",
        },
      }}
    >
      <MenuItem value="Today">Today</MenuItem>
      <MenuItem value="Week">Week</MenuItem>
      <MenuItem value="Month">Month</MenuItem>
      <MenuItem value="Year">Year</MenuItem>
    </Select>
  );
};

export default RangeSelect;
