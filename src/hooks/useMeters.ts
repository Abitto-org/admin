import { metersApi } from "@/api/meters.api";
import type { GetMetersParams, LinkMeterParams } from "@/types/meters.types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const useGetMeters = (params: GetMetersParams) => {
  return useQuery({
    queryKey: ["meters", params],
    queryFn: () => metersApi.getMeters(params),
    staleTime: 30000,
    retry: 2,
  });
};
export const useLinkMeter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LinkMeterParams) => metersApi.linkMeter(params),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["meters"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
