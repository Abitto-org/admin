import { http } from "./index";
import type { GetProfileResponse } from "@/types/user.types";

export const userApi = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<GetProfileResponse> => {
    const response = await http.get<GetProfileResponse>("/user/profile");
    return response.data;
  },
};
