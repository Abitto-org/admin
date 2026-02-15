
import { http } from "./index";
import type {
  GetMetersResponse,
  GetMetersParams,
  LinkMeterParams,
  LinkMeterResponse,
  UnlinkMeterParams,
  UnlinkMeterResponse,
} from "@/types/meters.types";

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

  linkMeter: async (params: LinkMeterParams): Promise<LinkMeterResponse> => {
    const { meterNumber, ...body } = params;
    const response = await http.post<LinkMeterResponse>(
      `/meter/admin/link/${meterNumber}`,
      body,
    );
    return response.data;
  },

  unlinkMeter: async (
    params: UnlinkMeterParams,
  ): Promise<UnlinkMeterResponse> => {
    const response = await http.post<UnlinkMeterResponse>(
      `/meter/admin/meters/${params.deviceId}/unlink`,
    );
    return response.data;
  },
};
