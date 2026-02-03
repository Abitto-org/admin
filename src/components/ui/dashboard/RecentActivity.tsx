import { Box, Typography } from "@mui/material";
import { type FC } from "react";
import PurchaseIcon from "@/assets/icons/purchase.svg";

interface ActivityItem {
  id: string;
  userName: string;
  timestamp: string;
  transactionId: string;
  amount: string;
  gasAmount: string;
}

const RecentActivity: FC = () => {
  // Sample data - replace with actual data
  const activities: ActivityItem[] = [
    {
      id: "1",
      userName: "Chibueze Samuel",
      timestamp: "Today, 2:34pm",
      transactionId: "TXN-78234",
      amount: "50.00",
      gasAmount: "+25kg",
    },
    {
      id: "2",
      userName: "Adaeze Okonkwo",
      timestamp: "Today, 1:15pm",
      transactionId: "TXN-78233",
      amount: "75.00",
      gasAmount: "+30kg",
    },
    {
      id: "3",
      userName: "Emeka Johnson",
      timestamp: "Today, 11:45am",
      transactionId: "TXN-78232",
      amount: "100.00",
      gasAmount: "+50kg",
    },
    {
      id: "4",
      userName: "Blessing Eze",
      timestamp: "Yesterday, 4:20pm",
      transactionId: "TXN-78231",
      amount: "60.00",
      gasAmount: "+25kg",
    },
    {
      id: "5",
      userName: "Tunde Bakare",
      timestamp: "Yesterday, 3:10pm",
      transactionId: "TXN-78230",
      amount: "80.00",
      gasAmount: "+40kg",
    },
    {
      id: "6",
      userName: "Grace Nwankwo",
      timestamp: "Yesterday, 2:05pm",
      transactionId: "TXN-78229",
      amount: "55.00",
      gasAmount: "+20kg",
    },
    {
      id: "7",
      userName: "David Obi",
      timestamp: "Yesterday, 12:30pm",
      transactionId: "TXN-78228",
      amount: "90.00",
      gasAmount: "+45kg",
    },
    {
      id: "8",
      userName: "Mary Okoli",
      timestamp: "Yesterday, 10:15am",
      transactionId: "TXN-78227",
      amount: "70.00",
      gasAmount: "+35kg",
    },
    {
      id: "9",
      userName: "John Musa",
      timestamp: "2 days ago, 5:45pm",
      transactionId: "TXN-78226",
      amount: "85.00",
      gasAmount: "+40kg",
    },
    {
      id: "10",
      userName: "Faith Okoro",
      timestamp: "2 days ago, 3:20pm",
      transactionId: "TXN-78225",
      amount: "65.00",
      gasAmount: "+30kg",
    },
  ];

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
      <Typography
        sx={{
          fontFamily: "Geist",
          fontWeight: 600,
          fontSize: { xs: "14px", sm: "15px", md: "16px" },
          lineHeight: "100%",
          letterSpacing: "-0.01em",
          textTransform: "capitalize",
          color: "#000000",
          mb: { xs: "16px", sm: "20px", md: "24px" },
        }}
      >
        Recent Activity
      </Typography>

      {/* Scrollable Activity List */}
      <Box
        className={"no-scrollbar"}
        sx={{
          height: {
            xs: "calc(100% - 40px)",
            sm: "calc(427px - 24px - 16px)",
          },
          overflowY: "auto",
          overflowX: "hidden",
          userSelect: "none",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "20px", sm: "24px", md: "28px" },
            userSelect: "none",
            pointerEvents: "auto",
          }}
        >
          {activities.map((activity) => (
            <Box
              key={activity.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: "12px", sm: "0" },
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {/* Left side - Icon and Text */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "6px", sm: "8px" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Box
                  component="img"
                  src={PurchaseIcon}
                  alt="purchase"
                  sx={{
                    width: { xs: "36px", sm: "40px" },
                    height: { xs: "36px", sm: "40px" },
                    flexShrink: 0,
                    userSelect: "none",
                    pointerEvents: "none",
                    WebkitUserDrag: "none",
                  }}
                />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    component="div"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "14px", sm: "15px", md: "16px" },
                      lineHeight: "100%",
                      letterSpacing: "-0.01em",
                      textTransform: "capitalize",
                      color: "#000000",
                      mb: { xs: 1.2, sm: 1.5 },
                      wordBreak: "break-word",
                    }}
                  >
                    gas purchase by{" "}
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: "Geist",
                        fontWeight: 600,
                        fontSize: { xs: "14px", sm: "15px", md: "16px" },
                        lineHeight: "100%",
                        letterSpacing: "-0.01em",
                        textTransform: "capitalize",
                        color: "#669900",
                        textDecoration: "underline",
                        textDecorationColor: "#669900",
                      }}
                    >
                      {activity.userName}
                    </Typography>
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Geist",
                      fontWeight: 500,
                      fontSize: { xs: "12px", sm: "13px", md: "14px" },
                      lineHeight: "100%",
                      letterSpacing: "-0.01em",
                      textTransform: "capitalize",
                      color: "#414141",
                      wordBreak: "break-word",
                    }}
                  >
                    {activity.timestamp} - {activity.transactionId}
                  </Typography>
                </Box>
              </Box>

              {/* Right side - Amount and Gas */}
              <Box
                sx={{
                  textAlign: { xs: "left", sm: "right" },
                  pl: { xs: "42px", sm: "0" },
                  width: { xs: "100%", sm: "auto" },
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "14px", sm: "15px", md: "16px" },
                    lineHeight: "100%",
                    letterSpacing: "-0.01em",
                    textTransform: "capitalize",
                    color: "#000000",
                    mb: "4px",
                  }}
                >
                  ₦ {activity.amount}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "Geist",
                    fontWeight: 500,
                    fontSize: { xs: "12px", sm: "13px", md: "14px" },
                    lineHeight: "100%",
                    letterSpacing: "-0.01em",
                    textTransform: "capitalize",
                    color: "#217C38",
                  }}
                >
                  {activity.gasAmount}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RecentActivity;
