import { http } from "./index";
import type { GetMetersResponse, GetMetersParams } from "@/types/meters.types";

export const metersApi = {
  getMeters: async (params: GetMetersParams): Promise<GetMetersResponse> => {
    const response = await http.get<GetMetersResponse>("/meter/admin/meters", {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        ...(params.isLinked !== undefined && { isLinked: params.isLinked }),
        ...(params.search && { search: params.search }),
      },
    });
    return response.data;
  },
};
