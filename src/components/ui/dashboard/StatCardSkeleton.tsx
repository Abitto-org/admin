import { Box, Typography, Stack, Skeleton } from "@mui/material";
import { type FC, type ReactNode } from "react";

interface StatCardSkeletonProps {
  label: string;
  action?: ReactNode;
}

const StatCardSkeleton: FC<StatCardSkeletonProps> = ({ label, action }) => {
  return (
    <Box
      sx={{
        height: "115px",
        borderRadius: "8px",
        padding: { xs: "12px 12px", md: "16px 20px" },
        border: "1px solid #F8F8F8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      {/* Label and Action - NOT LOADING */}
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

      {/* Value - LOADING */}
      <Skeleton
        variant="text"
        sx={{
          fontSize: { xs: "18px", md: "24px" },
          width: { xs: "60px", md: "80px" },
          mt: "4px",
        }}
      />

      {/* Subtext - LOADING */}
      <Skeleton
        variant="text"
        sx={{
          fontSize: { xs: "12px", md: "14px" },
          width: { xs: "120px", md: "160px" },
          mt: { xs: "8px", md: "12px" },
        }}
      />
    </Box>
  );
};

export default StatCardSkeleton;
