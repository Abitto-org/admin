export interface Notification {
  id: string;
  [key: string]: unknown;
}

export interface NotificationPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetUnreadCountResponse {
  status: string;
  message: string;
  data: {
    count: number;
  };
}

export interface GetNotificationsResponse {
  status: string;
  message: string;
  data: {
    notifications: Notification[];
    pagination: NotificationPagination;
  };
}

export interface GetNotificationsParams {
  page: number;
  limit?: number;
  isRead?: boolean;
}

export interface MarkAllReadResponse {
  status: string;
  message: string;
  data: {
    count: number;
  };
}

export interface MarkOneReadResponse {
  status: string;
  message: string;
}
