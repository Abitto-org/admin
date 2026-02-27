import { http } from "./index";
import type { GetStatsResponse } from "@/types/stats.types";

export const statsApi = {
  getStats: async (): Promise<GetStatsResponse> => {
    const response = await http.get<GetStatsResponse>("/admin/stats");
    return response.data;
  },
};
