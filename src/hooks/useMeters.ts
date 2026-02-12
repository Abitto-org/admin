import { useQuery } from "@tanstack/react-query";
import { metersApi } from "@/api/meters.api";
import type { GetMetersParams } from "@/types/meters.types";

export const useGetMeters = (params: GetMetersParams) => {
  return useQuery({
    queryKey: ["meters", params],
    queryFn: () => metersApi.getMeters(params),
    staleTime: 30000,
    retry: 2,
  });
};
