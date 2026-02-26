import { http } from "./index";
import type {
  GetSettingsResponse,
  UpdateSettingsPayload,
  UpdateSettingsResponse,
} from "@/types/settings.types";

export const settingsApi = {
  getSettings: async (): Promise<GetSettingsResponse> => {
    const response = await http.get<GetSettingsResponse>("/settings");
    return response.data;
  },

  updateSettings: async (
    payload: UpdateSettingsPayload,
  ): Promise<UpdateSettingsResponse> => {
    const response = await http.put<UpdateSettingsResponse>(
      "/settings",
      payload,
    );
    return response.data;
  },
};
