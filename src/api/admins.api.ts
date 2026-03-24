import { http } from "./index";
import type {
  GetAdminsResponse,
  ChangeAdminRolePayload,
  ChangeAdminRoleResponse,
  DeleteAdminResponse,
  GetAdminRolesResponse,
  GetAdminGroupsResponse,
  GetInvitationsResponse,
  GetInvitationsParams,
  SendInvitationPayload,
  SendInvitationResponse,
  CancelInvitationResponse,
  CompleteSetupPayload,
  CompleteSetupResponse,
} from "@/types/admins.types";

export const adminsApi = {
  // ── Admins ──────────────────────────────────────────────────────────────────
  getAdmins: async (): Promise<GetAdminsResponse> => {
    const response = await http.get<GetAdminsResponse>("/admin/admins");
    return response.data;
  },

  changeAdminRole: async (
    id: string,
    payload: ChangeAdminRolePayload,
  ): Promise<ChangeAdminRoleResponse> => {
    const response = await http.patch<ChangeAdminRoleResponse>(
      `/admin/admins/${id}/role`,
      payload,
    );
    return response.data;
  },

  deleteAdmin: async (id: string): Promise<DeleteAdminResponse> => {
    const response = await http.delete<DeleteAdminResponse>(
      `/admin/admins/${id}`,
    );
    return response.data;
  },

  // ── Roles ───────────────────────────────────────────────────────────────────
  getAdminRoles: async (): Promise<GetAdminRolesResponse> => {
    const response = await http.get<GetAdminRolesResponse>("/admin/roles");
    return response.data;
  },

  // ── Groups ──────────────────────────────────────────────────────────────────
  getAdminGroups: async (): Promise<GetAdminGroupsResponse> => {
    const response = await http.get<GetAdminGroupsResponse>("/admin/groups");
    return response.data;
  },

  // ── Invitations ─────────────────────────────────────────────────────────────
  getInvitations: async (
    params: GetInvitationsParams,
  ): Promise<GetInvitationsResponse> => {
    const response = await http.get<GetInvitationsResponse>(
      "/admin/invitations",
      {
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
          ...(params.status && { status: params.status }),
        },
      },
    );
    return response.data;
  },

  sendInvitation: async (
    payload: SendInvitationPayload,
  ): Promise<SendInvitationResponse> => {
    const response = await http.post<SendInvitationResponse>(
      "/admin/invitations",
      payload,
    );
    return response.data;
  },

  cancelInvitation: async (id: string): Promise<CancelInvitationResponse> => {
    const response = await http.delete<CancelInvitationResponse>(
      `/admin/invitations/${id}`,
    );
    return response.data;
  },

  completeSetup: async (
    payload: CompleteSetupPayload,
  ): Promise<CompleteSetupResponse> => {
    const response = await http.post<CompleteSetupResponse>(
      "/admin/invitations/complete-setup",
      payload,
    );
    return response.data;
  },
};
