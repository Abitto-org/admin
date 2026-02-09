import type { FC } from "react";
import type { ILinkRequest } from "@/types/linkRequest.types";
import { Box, Typography } from "@mui/material";

const LinkRequestCard: FC<ILinkRequest> = (request) => {
  const handleApprove = () => {
    console.log("Approve clicked for:");
  };
  return (
    <Box
      key={request.id}
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
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textTransform: "uppercase",
            color: "#121212",
            wordBreak: "break-all",
          }}
        >
          {request.meterId}
        </Typography>

        <Typography
          onClick={handleApprove}
          sx={{
            fontFamily: "Geist",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textTransform: "capitalize",
            color: "#669900",
            cursor: "pointer",
            flexShrink: 0,
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          Approve
        </Typography>
      </Box>

      {/* User Information */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* User Name */}
        <Box sx={{ mb: { xs: 1, sm: 1.5 }, mt: { xs: 1, sm: 1.5 } }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#414141",
              mb: "4px",
            }}
          >
            User Name
          </Typography>
          <Typography
            sx={{
              fontFamily: "Geist",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: { xs: "16px", sm: "18px", md: "19px" },
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#000000",
            }}
          >
            {request.userName}
          </Typography>
        </Box>

        {/* Address */}
        <Box>
          <Typography
            sx={{
              fontFamily: "Geist",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#414141",
              mb: "4px",
            }}
          >
            Address
          </Typography>
          <Typography
            sx={{
              fontFamily: "Geist",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: { xs: "16px", sm: "18px", md: "19px" },
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#000000",
            }}
          >
            {request.address}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LinkRequestCard;
