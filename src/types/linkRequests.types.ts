type Status = "pending" | "approved" | "rejected";
export type LinkRequestStatus = "success" | "pending" | "failed";

// ─── Core Entities ────────────────────────────────────────────────────────────

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
  status: Status;
  adminId: string | null;
  estateId: string | null;
  houseNumber: string | null;
  estateName: string | null;
  reason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LinkRequestMeter {
  id: string;
  deviceId: string;
  meterNumber: string;
}

// ─── API Response Shape (matches actual backend response) ─────────────────────

export interface LinkRequestWithUser {
  meter_link_requests: LinkRequest;
  users: LinkRequestUser;
  meters: LinkRequestMeter;
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
  status?: Status;
  search?: string;
  startDate?: string;
  endDate?: string;
}

// ─── Table / UI Types ─────────────────────────────────────────────────────────

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

export interface ILinkRequestCard {
  id: string;
  meterId: string;
  meterNumber: string;
  userName: string;
  address: string;
}

export interface LinkRequestDetailsData {
  id: string;
  userId: string;
  meterId: string;
  deviceId: string;
  meterNumber: string;
  userName: string;
  userEmail: string;
  estateId: string | null;
  estateName: string | null;
  houseNumber: string | null;
  status: Status;
  requestType: string;
  createdAt: string;
  reason: string | null;
}

// ─── Mutation Types ───────────────────────────────────────────────────────────

export interface ReviewLinkRequestParams {
  id: string;
  status: "approved" | "rejected";
  reason?: string;
}

export interface ReviewLinkRequestResponse {
  status: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
