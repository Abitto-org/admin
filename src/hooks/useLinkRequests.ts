import { useQuery } from "@tanstack/react-query";
import { linkRequestsApi } from "@/api/linkRequests.api";
import type { GetLinkRequestsParams } from "@/types/linkRequests.types";

export const useGetLinkRequests = (params: GetLinkRequestsParams) => {
  return useQuery({
    queryKey: ["linkRequests", params],
    queryFn: () => linkRequestsApi.getLinkRequests(params),
    staleTime: 30000,
    retry: 2,
  });
};
