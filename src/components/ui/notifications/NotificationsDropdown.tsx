import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { type FC, useRef, useCallback, useEffect } from "react";
import {
  useGetNotifications,
  useMarkAllRead,
  useMarkOneRead,
} from "@/hooks/useNotifications";
import type { Notification } from "@/types/notifications.types";


const NotificationsDropdown = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetNotifications();

  const { mutate: markAllRead, isPending: isMarkingAll } = useMarkAllRead();
  const { mutate: markOneRead, isPending: isMarkingOne } = useMarkOneRead();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  const allNotifications =
    data?.pages.flatMap((page) => page.data.notifications ?? []) ?? [];

  const totalCount = data?.pages[0]?.data.pagination.total ?? 0;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        width: { xs: "calc(100vw - 24px)", sm: "380px" },
        maxHeight: "480px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
        border: "1px solid #ECECEC",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 200,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "100%",
              color: "#000000",
            }}
          >
            Notifications
          </Typography>
          {totalCount > 0 && (
            <Box
              sx={{
                backgroundColor: "#669900",
                borderRadius: "32px",
                padding: "3px 8px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "100%",
                  color: "white",
                }}
              >
                {totalCount}
              </Typography>
            </Box>
          )}
        </Box>

        {allNotifications.length > 0 && (
          <Box
            onClick={() => !isMarkingAll && markAllRead()}
            sx={{
              cursor: isMarkingAll ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              opacity: isMarkingAll ? 0.6 : 1,
            }}
          >
            {isMarkingAll && (
              <CircularProgress size={10} sx={{ color: "#669900" }} />
            )}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "100%",
                color: "#669900",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Mark all read
            </Typography>
          </Box>
        )}
      </Box>

      <Divider />

      {/* Body */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px",
            }}
          >
            <CircularProgress size={24} sx={{ color: "#669900" }} />
          </Box>
        ) : allNotifications.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "48px 24px",
              gap: "8px",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "#414141",
              }}
            >
              No notifications yet
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                color: "#888888",
                textAlign: "center",
              }}
            >
              You're all caught up!
            </Typography>
          </Box>
        ) : (
          <>
            {allNotifications.map((notification, index) => (
              <Box key={notification?.id ?? index}>
                <NotificationItem
                  notification={notification}
                  onMarkRead={(id) => markOneRead(id)}
                  isMarkingRead={isMarkingOne}
                />
                {index < allNotifications.length - 1 && (
                  <Divider sx={{ mx: "16px" }} />
                )}
              </Box>
            ))}

            {/* Infinite scroll sentinel */}
            <Box ref={sentinelRef} sx={{ height: "1px" }} />

            {isFetchingNextPage && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "12px",
                }}
              >
                <CircularProgress size={18} sx={{ color: "#669900" }} />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default NotificationsDropdown;

const NotificationItem: FC<{
  notification: Notification;
  onMarkRead: (id: string) => void;
  isMarkingRead: boolean;
}> = ({ notification, onMarkRead, isMarkingRead }) => {
  // Log shape on first render so we can inspect the actual fields
  useEffect(() => {
    console.log("[NotificationItem] shape:", notification);
  }, [notification]);

  const isRead = notification?.isRead as boolean | undefined;
  const title = (notification?.title as string) ?? "Notification";
  const message = (notification?.message as string) ?? null;
  const createdAt = notification?.createdAt
    ? new Date(notification.createdAt as string).toLocaleString()
    : null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "12px",
        padding: "12px 16px",
        backgroundColor: isRead === false ? "#F0F7E6" : "white",
        transition: "background-color 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: isRead === false ? "#E8F2D8" : "#FAFAFA",
        },
        cursor: "default",
      }}
    >
      {/* Unread dot */}
      <Box sx={{ pt: "6px", flexShrink: 0 }}>
        <Box
          sx={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: isRead === false ? "#669900" : "transparent",
            border: isRead === false ? "none" : "1.5px solid #CCCCCC",
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontWeight: isRead === false ? 600 : 400,
            fontSize: "14px",
            lineHeight: "140%",
            color: "#000000",
            mb: message ? "4px" : 0,
          }}
          noWrap
        >
          {title}
        </Typography>
        {message && (
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "140%",
              color: "#414141",
              mb: createdAt ? "4px" : 0,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {message}
          </Typography>
        )}
        {createdAt && (
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "100%",
              color: "#888888",
            }}
          >
            {createdAt}
          </Typography>
        )}
      </Box>

      {/* Mark as read button — only show if unread */}
      {isRead === false && (
        <Tooltip title="Mark as read" placement="top">
          <IconButton
            onClick={() => onMarkRead(notification.id)}
            disabled={isMarkingRead}
            size="small"
            sx={{
              flexShrink: 0,
              width: "24px",
              height: "24px",
              color: "#669900",
              "&:hover": { backgroundColor: "#6699001A" },
            }}
          >
            {isMarkingRead ? (
              <CircularProgress size={12} sx={{ color: "#669900" }} />
            ) : (
              // Simple checkmark icon via SVG to avoid extra imports
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7L5.5 10.5L12 3.5"
                  stroke="#669900"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
