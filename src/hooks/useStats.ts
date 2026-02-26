import { useQuery } from "@tanstack/react-query";
import { statsApi } from "@/api/stats.api";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => statsApi.getStats(),
    staleTime: 30000,
    retry: 2,
  });
};