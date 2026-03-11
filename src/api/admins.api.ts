import { http } from "./index";
import type {
  GetAdminsResponse,
  ChangeAdminRolePayload,
  ChangeAdminRoleResponse,
  DeleteAdminResponse,
} from "@/types/admins.types";

export const adminsApi = {
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
};
