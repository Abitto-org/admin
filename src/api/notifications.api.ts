import { http } from "./index";
import type {
  GetUnreadCountResponse,
  GetNotificationsResponse,
  GetNotificationsParams,
  MarkAllReadResponse,
  MarkOneReadResponse,
} from "@/types/notifications.types";

export const notificationsApi = {
  getUnreadCount: async (): Promise<GetUnreadCountResponse> => {
    const response = await http.get<GetUnreadCountResponse>(
      "/notifications/unread-count",
    );
    return response.data;
  },

  getNotifications: async (
    params: GetNotificationsParams,
  ): Promise<GetNotificationsResponse> => {
    const response = await http.get<GetNotificationsResponse>(
      "/notifications",
      {
        params: {
          page: params.page,
          limit: params.limit ?? 20,
          ...(params.isRead !== undefined && { isRead: params.isRead }),
        },
      },
    );
    return response.data;
  },

  markAllRead: async (): Promise<MarkAllReadResponse> => {
    const response = await http.patch<MarkAllReadResponse>(
      "/notifications/mark-all-read",
    );
    return response.data;
  },

  markOneRead: async (id: string): Promise<MarkOneReadResponse> => {
    const response = await http.patch<MarkOneReadResponse>(
      `/notifications/${id}/read`,
    );
    return response.data;
  },
};
