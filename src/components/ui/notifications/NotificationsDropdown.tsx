import { Box, Typography, CircularProgress, Divider } from "@mui/material";
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
  const { mutate: markOneRead } = useMarkOneRead();

  // Infinite scroll sentinel
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
      <Box className="no-scrollbar" sx={{ flex: 1, overflowY: "auto" }}>
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
              sx={{ fontWeight: 600, fontSize: "14px", color: "#414141" }}
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
                  onVisible={(id) => markOneRead(id)}
                />
                {index < allNotifications.length - 1 && <Divider />}
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
  onVisible: (id: string) => void;
}> = ({ notification, onVisible }) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  // Track if we've already fired for this item so we only mark once
  const hasMarked = useRef(false);

  const isRead = notification?.isRead as boolean | undefined;
  const title = (notification?.title as string) ?? "Notification";
  const message = (notification?.message as string) ?? null;
  const createdAt = notification?.createdAt
    ? new Date(notification.createdAt as string).toLocaleString()
    : null;

  useEffect(() => {
    // Already read or already marked this session — no observer needed
    if (isRead !== false || hasMarked.current) return;

    const node = itemRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasMarked.current) {
          // Small delay so we don't fire on items that flash by quickly
          const timer = setTimeout(() => {
            hasMarked.current = true;
            onVisible(notification.id);
            observer.disconnect();
          }, 800);

          // If it leaves viewport before the delay, cancel
          entries[0].target.addEventListener(
            "mouseleave",
            () => clearTimeout(timer),
            { once: true },
          );
        }
      },
      { threshold: 0.6 }, // at least 60% of the item must be visible
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isRead, notification.id, onVisible]);

  return (
    <Box
      ref={itemRef}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px 16px",
        backgroundColor: isRead === false ? "#F0F7E6" : "white",
        transition: "background-color 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: isRead === false ? "#E8F2D8" : "#FAFAFA",
        },
        cursor: "pointer",
      }}
    >
      {/* Unread dot */}
      {/* <Box sx={{ pt: "6px", flexShrink: 0 }}>
        <Box
          sx={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: isRead === false ? "#669900" : "transparent",
            border: isRead === false ? "none" : "1.5px solid #CCCCCC",
          }}
        />
      </Box> */}

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
    </Box>
  );
};
