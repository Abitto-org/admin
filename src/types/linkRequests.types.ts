// Link Request API Types

export interface LinkRequestUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LinkRequest {
  id: string;
  userId: string;
  meterId: string;
  status: "pending" | "approved" | "rejected";
  adminId: string | null;
  estateId: string | null;
  houseNumber: string | null;
  estateName: string | null;
  reason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LinkRequestWithUser {
  request: LinkRequest;
  user: LinkRequestUser;
  meter: {
    id: string;
    deviceId: string;
    meterNumber: string;
  };
}

export interface LinkRequestStats {
  pendingLinkRequests: number;
  linkRequestsToday: number;
  totalLinkedMeters: number;
  rejectedRequests: number;
  rejectedToday: number;
}

export interface LinkRequestPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetLinkRequestsResponse {
  status: string;
  message: string;
  data: {
    stats: LinkRequestStats;
    requests: LinkRequestWithUser[];
    pagination: LinkRequestPagination;
  };
}

export interface GetLinkRequestsParams {
  page?: number;
  limit?: number;
  status?: "pending" | "approved" | "rejected";
  search?: string;
  startDate?: string;
  endDate?: string;
}

export type LinkRequestStatus = "success" | "pending" | "failed";

export interface LinkRequestTableRow {
  id: string;
  meterId: string;
  meterNumber: string;
  user: string;
  requestType: string;
  date: string;
  address: string;
  status: LinkRequestStatus;
  rawStatus: string;
}

// Link Request API Types

export interface LinkRequestUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LinkRequest {
  id: string;
  userId: string;
  meterId: string;
  status: "pending" | "approved" | "rejected";
  adminId: string | null;
  estateId: string | null;
  houseNumber: string | null;
  estateName: string | null;
  reason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LinkRequestWithUser {
  request: LinkRequest;
  user: LinkRequestUser;
  meter: {
    id: string;
    deviceId: string;
    meterNumber: string;
  };
}

export interface LinkRequestStats {
  pendingLinkRequests: number;
  linkRequestsToday: number;
  totalLinkedMeters: number;
  rejectedRequests: number;
  rejectedToday: number;
}

export interface LinkRequestPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetLinkRequestsResponse {
  status: string;
  message: string;
  data: {
    stats: LinkRequestStats;
    requests: LinkRequestWithUser[];
    pagination: LinkRequestPagination;
  };
}

export interface GetLinkRequestsParams {
  page?: number;
  limit?: number;
  status?: "pending" | "approved" | "rejected";
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface LinkRequestTableRow {
  id: string;
  meterId: string;
  meterNumber: string;
  user: string;
  requestType: string;
  date: string;
  address: string;
  status: LinkRequestStatus;
  rawStatus: string;
}

// Card-specific interface for dashboard widget
export interface ILinkRequestCard {
  id: string;
  meterId: string;
  meterNumber: string;
  userName: string;
  address: string;
}
