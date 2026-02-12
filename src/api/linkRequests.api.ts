import { http } from "./index";
import type {
  GetLinkRequestsResponse,
  GetLinkRequestsParams,
} from "@/types/linkRequests.types";

export const linkRequestsApi = {
  getLinkRequests: async (
    params: GetLinkRequestsParams,
  ): Promise<GetLinkRequestsResponse> => {
    const response = await http.get<GetLinkRequestsResponse>(
      "/meter/link-requests",
      {
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.status && { status: params.status }),
          ...(params.search && { search: params.search }),
          ...(params.startDate && { startDate: params.startDate }),
          ...(params.endDate && { endDate: params.endDate }),
        },
      },
    );
    return response.data;
  },
};
