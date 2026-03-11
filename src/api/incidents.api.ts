import { http } from "./index";
import type {
  GetIncidentsResponse,
  GetIncidentsParams,
  ResolveIncidentResponse,
} from "@/types/incidents.types";

export const incidentsApi = {
  getIncidents: async (
    params: GetIncidentsParams,
  ): Promise<GetIncidentsResponse> => {
    const response = await http.get<GetIncidentsResponse>(
      "/admin/incident-reports",
      {
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
          ...(params.type && { type: params.type }),
          ...(params.status && { status: params.status }),
        },
      },
    );
    return response.data;
  },

  resolveIncident: async (id: string): Promise<ResolveIncidentResponse> => {
    const response = await http.patch<ResolveIncidentResponse>(
      `/admin/incident-reports/${id}/resolve`,
    );
    return response.data;
  },
};
