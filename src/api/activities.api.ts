import { http } from "./index";
import type {
  GetActivitiesResponse,
  GetActivitiesParams,
} from "@/types/activities.types";

export const activitiesApi = {
  getActivities: async (
    params: GetActivitiesParams,
  ): Promise<GetActivitiesResponse> => {
    const response = await http.get<GetActivitiesResponse>(
      "/admin/activities",
      {
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
        },
      },
    );
    return response.data;
  },
};
