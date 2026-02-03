import { Box, Typography } from "@mui/material";
import { type FC } from "react";

interface LinkRequestItem {
  id: string;
  meterId: string;
  userName: string;
  address: string;
}

const LinkRequest: FC = () => {
  // Sample data - replace with actual data
  const linkRequests: LinkRequestItem[] = [
    {
      id: "1",
      meterId: "MSW123456967",
      userName: "Michael Jones",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
    },
    {
      id: "2",
      meterId: "MSW987654321",
      userName: "Sarah Williams",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      id: "3",
      meterId: "MSW456789123",
      userName: "Robert Brown",
      address: "1234 Oak Street, Springfield, Illinois 62701",
    },
    {
      id: "4",
      meterId: "MSW789123456",
      userName: "Emily Davis",
      address: "5678 Pine Avenue, Portland, Oregon 97204",
    },
    {
      id: "5",
      meterId: "MSW789123456",
      userName: "Emily Davis",
      address: "5678 Pine Avenue, Portland, Oregon 97204",
    },
    {
      id: "6",
      meterId: "MSW789123456",
      userName: "Emily Davis",
      address: "5678 Pine Avenue, Portland, Oregon 97204",
    },
  ];

  const handleViewAll = () => {
    console.log("View All clicked");
  };

  const handleApprove = (meterId: string) => {
    console.log("Approve clicked for:", meterId);
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
            fontSize: { xs: "14px", sm: "15px", md: "16px" },
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
            fontSize: { xs: "14px", sm: "15px", md: "16px" },
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
        {linkRequests.map((request) => (
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

              <Typography
                onClick={() => handleApprove(request.meterId)}
                sx={{
                  fontFamily: "Geist",
                  fontWeight: 700,
                  fontSize: { xs: "12px", sm: "13px", md: "14px" },
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
        ))}
      </Box>
    </Box>
  );
};

export default LinkRequest;
