import { http } from "./index";
import type {
  GetProfileResponse,
  GetUsersParams,
  GetUsersResponse,
  GetUserMetersResponse,
} from "@/types/users.types";

export const usersApi = {
  getProfile: async (): Promise<GetProfileResponse> => {
    const response = await http.get<GetProfileResponse>("/user/profile");
    return response.data;
  },
  getUsers: async (params: GetUsersParams): Promise<GetUsersResponse> => {
    const response = await http.get<GetUsersResponse>("/user/admin/users", {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        ...(params.isActive !== undefined && { isActive: params.isActive }),
        ...(params.search && { search: params.search }),
      },
    });
    return response.data;
  },
  getUserMeters: async (userId: string): Promise<GetUserMetersResponse> => {
    const response = await http.get<GetUserMetersResponse>(
      `/user/admin/users/${userId}/meters`,
    );
    return response.data;
  },
};
