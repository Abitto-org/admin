import { Box, Skeleton } from "@mui/material";
import type { FC } from "react";

const LinkRequestCardSkeleton: FC = () => {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        backgroundColor: "#FAFAFA",
        padding: { xs: "10px", sm: "12px" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Box with ID and Approve */}
      <Box
        sx={{
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          padding: { xs: "10px", sm: "12px" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: "10px", sm: "12px" },
          gap: "8px",
        }}
      >
        {/* Meter ID Skeleton */}
        <Skeleton
          variant="text"
          sx={{
            fontSize: "14px",
            width: { xs: "120px", sm: "140px" },
          }}
        />

        {/* Approve Button Skeleton */}
        <Skeleton
          variant="text"
          sx={{
            fontSize: "14px",
            width: "60px",
            flexShrink: 0,
          }}
        />
      </Box>

      {/* User Information */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* User Name */}
        <Box sx={{ mb: { xs: 1, sm: 1.5 }, mt: { xs: 1, sm: 1.5 } }}>
          <Skeleton
            variant="text"
            sx={{
              fontSize: "14px",
              width: "80px",
              mb: "4px",
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              fontSize: "14px",
              width: { xs: "100px", sm: "120px" },
            }}
          />
        </Box>

        {/* Address */}
        <Box>
          <Skeleton
            variant="text"
            sx={{
              fontSize: "14px",
              width: "60px",
              mb: "4px",
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              fontSize: "14px",
              width: { xs: "140px", sm: "160px" },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LinkRequestCardSkeleton;