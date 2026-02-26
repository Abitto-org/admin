import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { notificationsApi } from "@/api/notifications.api";

const LIMIT = 20;

export const useGetUnreadCount = () => {
  return useQuery({
    queryKey: ["GET_NOTIFICATIONS_UNREAD_COUNT"],
    queryFn: () => notificationsApi.getUnreadCount(),
    staleTime: 30000,
    retry: 2,
  });
};

export const useGetNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["GET_NOTIFICATIONS"],
    queryFn: ({ pageParam = 1 }) =>
      notificationsApi.getNotifications({
        page: pageParam,
        limit: LIMIT,
      }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 30000,
    retry: 2,
  });
};

export const useMarkAllRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_NOTIFICATIONS"] });
      queryClient.invalidateQueries({
        queryKey: ["GET_NOTIFICATIONS_UNREAD_COUNT"],
      });
    },
  });
};

export const useMarkOneRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsApi.markOneRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_NOTIFICATIONS"] });
      queryClient.invalidateQueries({
        queryKey: ["GET_NOTIFICATIONS_UNREAD_COUNT"],
      });
    },
  });
};
