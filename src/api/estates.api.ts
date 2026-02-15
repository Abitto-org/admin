// estates.api.ts
import { http } from "./index";
import type {
  GetEstatesResponse,
  GetEstatesParams,
  CreateEstateParams,
  CreateEstateResponse,
} from "@/types/estates.types";

export const estatesApi = {
  getEstates: async (params: GetEstatesParams): Promise<GetEstatesResponse> => {
    const response = await http.get<GetEstatesResponse>("/estate/admin/list", {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        ...(params.search && { search: params.search }),
      },
    });
    return response.data;
  },

  createEstate: async (
    params: CreateEstateParams,
  ): Promise<CreateEstateResponse> => {
    const response = await http.post<CreateEstateResponse>("/estate", params);
    return response.data;
  },
};
