import type { Meter } from "./meters.types";

export interface GetProfileResponseData {
  user: User;
}

export type GetProfileResponse =
  import("./api.types").ApiResponse<GetProfileResponseData>;

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  phoneNumber: string | null;
  avatar: string | null;
  country: string | null;
  referralCode: string | null;
  referredBy: string | null;
  isActive: boolean;
  isAmbassador: boolean;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  failedLoginAttempts: number;
  lockoutUntil: string | null;
  createdAt: string;
  updatedAt: string;
  deleteRequestedAt: string | null;
  deleteEffectiveAt: string | null;
  isArchived: boolean;
  archivedAt: string | null;
  archiveReason: string | null;
  pushNotificationEnabled: boolean;
  emailNotificationEnabled: boolean;
  telegramNotificationEnabled: boolean;
  role: string;
  telegramChatId: string | null;
  telegramLinkedAt: string | null;
  adminRoleId: string | null;
  adminGroupId: string | null;
  gender: string | null;
  nin: string | null;
  estateId: string | null;
  houseNumber: string | null;
  onboardingEstateName: string | null;
  onboardingCompleted: boolean;
  hasLinkedMeter: boolean;
}

export interface UserStats {
  totalUsers: number;
  joinedToday: number;
  activeToday: number;
  usersWithoutMeters: number;
  totalKgBoughtToday: number;
  percentageWithoutMeters: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetUsersResponse {
  status: string;
  message: string;
  data: {
    stats: UserStats;
    users: User[];
    pagination: Pagination;
  };
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export interface GetUserMetersResponse {
  status: string;
  message: string;
  data: {
    meters: Meter[];
    count: number;
  };
}

export interface UserTableRow {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: boolean;
  meterLinked: boolean;
  dateJoined: string;
}
