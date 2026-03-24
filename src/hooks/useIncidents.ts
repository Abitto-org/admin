import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { incidentsApi } from "@/api/incidents.api";
import type { GetIncidentsParams } from "@/types/incidents.types";

export const useGetIncidents = (params: GetIncidentsParams) => {
  return useQuery({
    queryKey: ["incidents", params],
    queryFn: () => incidentsApi.getIncidents(params),
    staleTime: 30000,
    retry: 2,
  });
};

export const useResolveIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      incidentsApi.resolveIncident(id, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });
};
