import { Box, Typography } from "@mui/material";
import { type FC } from "react";
import LinkRequestCard from "./LinkRequestCard";
import { linkRequests } from "@/data";

const LinkRequest: FC = () => {
  const handleViewAll = () => {
    console.log("View All clicked");
  };

  return (
    <Box
      sx={{
        height: { xs: "auto", sm: "427px" },
        minHeight: { xs: "300px", sm: "427px" },
        maxHeight: { xs: "500px", sm: "427px" },
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        padding: { xs: "16px", sm: "20px", md: "24px" },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: "16px", sm: "20px", md: "24px" },
          flexWrap: "wrap",
          gap: { xs: "8px", sm: "0" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Geist",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "-0.01em",
            textTransform: "capitalize",
            color: "#000000",
          }}
        >
          Link Request
        </Typography>

        <Typography
          onClick={handleViewAll}
          sx={{
            fontFamily: "Geist",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "-0.01em",
            textTransform: "capitalize",
            color: "#669900",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          View All
        </Typography>
      </Box>

      {/* Link Request Cards Grid */}
      <Box
        className={"no-scrollbar"}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: { xs: "12px", sm: "10px" },
          height: {
            xs: "calc(100% - 40px)",
            sm: "calc(427px - 24px - 16px)",
          },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F5F5F5",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#D0D0D0",
            borderRadius: "3px",
            "&:hover": {
              backgroundColor: "#B0B0B0",
            },
          },
        }}
      >
        {linkRequests.map((request, index) => (
          <LinkRequestCard key={index} {...request} />
        ))}
      </Box>
    </Box>
  );
};

export default LinkRequest;
