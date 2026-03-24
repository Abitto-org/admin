import type { User } from "./users.types";

export interface GetAdminsResponse {
  status: string;
  message: string;
  data: User[];
}

export interface ChangeAdminRolePayload {
  adminRoleId: string;
}

export interface ChangeAdminRoleResponse {
  status: string;
  message: string;
  data: Partial<User>;
}

export interface DeleteAdminResponse {
  status: string;
  message: string;
}

// ── Roles ─────────────────────────────────────────────────────────────────────

export interface AdminRole {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  archivedAt: string | null;
}

export interface GetAdminRolesResponse {
  status: string;
  message: string;
  data: AdminRole[];
}

// ── Groups ────────────────────────────────────────────────────────────────────

export interface AdminGroup {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  archivedAt: string | null;
}

export interface GetAdminGroupsResponse {
  status: string;
  message: string;
  data: AdminGroup[];
}

// ── Invitations ───────────────────────────────────────────────────────────────

export type InvitationStatus = "pending" | "accepted" | "expired";

export interface Invitation {
  id: string;
  email: string;
  tokenHash: string;
  roleId: string | null;
  groupId: string | null;
  customPermissions: unknown;
  excludedPermissions: unknown;
  expiresAt: string | null;
  invitedBy: string | null;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GetInvitationsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: InvitationStatus;
}

export interface GetInvitationsResponse {
  status: string;
  message: string;
  data: {
    results: Invitation[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface SendInvitationPayload {
  adminEmail: string;
  roleId: string;
  groupId: string;
}

export interface SendInvitationResponse {
  status: string;
  message: string;
  data?: unknown;
}

export interface CancelInvitationResponse {
  status: string;
  message: string;
}

// ── Complete Setup ────────────────────────────────────────────────────────────

export interface CompleteSetupPayload {
  firstName: string;
  lastName: string;
  password: string;
  token: string;
}

export interface CompleteSetupResponse {
  status: string;
  message: string;
  data?: { message: string };
}
