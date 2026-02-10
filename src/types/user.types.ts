// User types
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
}

export interface GetProfileResponseData {
  user: User;
}

export type GetProfileResponse =
  import("./api.types").ApiResponse<GetProfileResponseData>;
