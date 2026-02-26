import { Box, Typography } from "@mui/material";
import { type FC, useMemo } from "react";
import LinkRequestCard from "./LinkRequestCard";
import LinkRequestCardSkeleton from "./LinkRequestCardSkeleton";
import { useGetLinkRequests } from "@/hooks/useLinkRequests";
import type { ILinkRequestCard } from "@/types/linkRequests.types";
import { useNavigate } from "react-router-dom";

const LinkRequest: FC = () => {
  const navigate = useNavigate();

  // Fetch only pending requests, limit to 4 (latest)
  const { data, isLoading } = useGetLinkRequests({
    page: 1,
    limit: 4,
    status: "pending",
  });

  console.log("Dashboard Link Requests data:", data);

  // Transform API data to card format
  const linkRequestCards: ILinkRequestCard[] = useMemo(() => {
    if (!data?.data?.requests) return [];

    return data.data.requests.map((item) => {
      const { request, user, meter } = item;

      // Format address with null checks
      const houseNumber = request.houseNumber || "N/A";
      const estatePart = request.estateName ? `, ${request.estateName}` : "";
      const address = `${houseNumber}${estatePart}`;

      // Format user name with null checks
      const userName = user
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
          "Unassigned"
        : "Unassigned";

      return {
        id: request.id || "",
        meterId: meter?.deviceId || "N/A",
        meterNumber: meter?.meterNumber || "N/A",
        userName,
        address,
      };
    });
  }, [data]);

  const handleViewAll = () => {
    console.log("View All clicked");
    navigate("/link-requests");
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
        {isLoading ? (
          <>
            <LinkRequestCardSkeleton />
            <LinkRequestCardSkeleton />
            <LinkRequestCardSkeleton />
            <LinkRequestCardSkeleton />
          </>
        ) : linkRequestCards.length > 0 ? (
          linkRequestCards.map((request) => (
            <LinkRequestCard key={request.id} {...request} />
          ))
        ) : (
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Geist",
                fontWeight: 500,
                fontSize: "14px",
                color: "#808080",
                textAlign: "center",
              }}
            >
              No pending link requests
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LinkRequest;
