import { Box, Typography, CircularProgress } from "@mui/material";
import { type FC } from "react";
import PurchaseIcon from "@/assets/icons/purchase.svg";
import { useGetActivities } from "@/hooks/useActivities";
import { useNavigate } from "react-router-dom";

const formatTimestamp = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (diffDays === 0) return `Today, ${timeStr}`;
  if (diffDays === 1) return `Yesterday, ${timeStr}`;
  return `${diffDays} days ago, ${timeStr}`;
};

const RecentActivity: FC = () => {
  const { data, isLoading } = useGetActivities();
  const navigate = useNavigate();

  const activities = data?.data ?? [];

  const handleNavigateUser = (userId: string) => {
    navigate(`/users/${userId}`);
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
      <Typography
        sx={{
          fontFamily: "Geist",
          fontWeight: 600,
          fontSize: "16px",
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
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F5F5F5",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#D0D0D0",
            borderRadius: "3px",
            "&:hover": { backgroundColor: "#B0B0B0" },
          },
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress size={24} sx={{ color: "#669900" }} />
          </Box>
        ) : activities.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Geist",
                fontWeight: 500,
                fontSize: "14px",
                color: "#414141",
              }}
            >
              No recent activity
            </Typography>
          </Box>
        ) : (
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
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "-0.01em",
                        textTransform: "capitalize",
                        color: "#000000",
                        mb: { xs: 1.2, sm: 1.5 },
                        wordBreak: "break-word",
                      }}
                    >
                      {activity.title} by{" "}
                      <Typography
                        component="span"
                        onClick={() => handleNavigateUser(activity.userId)}
                        sx={{
                          fontFamily: "Geist",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "-0.01em",
                          textTransform: "capitalize",
                          color: "#669900",
                          textDecoration: "underline",
                          textDecorationColor: "#669900",
                          cursor: "pointer",
                        }}
                      >
                        {activity.userName}
                      </Typography>
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily: "Geist",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "100%",
                        letterSpacing: "-0.01em",
                        color: "#414141",
                        wordBreak: "break-word",
                      }}
                    >
                      {formatTimestamp(activity.createdAt)}
                    </Typography>
                  </Box>
                </Box>

                {/* Right side - Description */}
                <Box
                  sx={{
                    textAlign: { xs: "left", sm: "right" },
                    pl: { xs: "42px", sm: "0" },
                    width: { xs: "100%", sm: "auto" },
                    flexShrink: 0,
                    maxWidth: { sm: "200px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Geist",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "-0.01em",
                      color: "#217C38",
                    }}
                  >
                    {activity.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RecentActivity;
