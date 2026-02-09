import type { FC } from "react";
import type { ILinkRequest } from "@/types/linkRequest.types";
import { Box, Typography } from "@mui/material";

const ConnectedMetersCard: FC<ILinkRequest> = (request) => {
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
      <Box
        sx={{
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          padding: { xs: "10px", sm: "12px" },
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          mb: { xs: "10px", sm: "12px" },
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "12px", sm: "13px", md: "14px" },
            lineHeight: "100%",
            letterSpacing: "0%",
            textTransform: "uppercase",
            color: "#121212",
            wordBreak: "break-all",
          }}
        >
          {request.meterId}
        </Typography>
      </Box>

      {/* User Information */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* User Name */}
        <Box sx={{ mb: { xs: 1, sm: 1.5 }, mt: { xs: 1, sm: 1.5 } }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: "12px", sm: "13px", md: "14px" },
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
              fontSize: { xs: "12px", sm: "13px", md: "14px" },
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
              fontSize: { xs: "12px", sm: "13px", md: "14px" },
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
              fontSize: { xs: "12px", sm: "13px", md: "14px" },
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

export default ConnectedMetersCard;
