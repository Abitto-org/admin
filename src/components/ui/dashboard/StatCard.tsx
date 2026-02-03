import { Box, Typography, Stack } from "@mui/material";
import { type FC, type ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  subtext: ReactNode;
  action?: ReactNode;
}

const StatCard: FC<StatCardProps> = ({ label, value, subtext, action }) => {
  return (
    <Box
      sx={{
        height: "115px",
        borderRadius: "8px",
        padding: "16px 20px",
        border: "1px solid #F8F8F8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      {/* Label and Action */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textTransform: "capitalize",
            color: "#414141",
          }}
        >
          {label}
        </Typography>
        {action}
      </Stack>

      {/* Value */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "24px",
          lineHeight: "100%",
          letterSpacing: "-2%",
          textTransform: "capitalize",
          color: "#000000",
          mt: "4px",
        }}
      >
        {value}
      </Typography>

      {/* Subtext */}
      <Box sx={{ mt: "12px" }}>{subtext}</Box>
    </Box>
  );
};

export default StatCard;
