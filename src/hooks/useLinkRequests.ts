import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { linkRequestsApi } from "@/api/linkRequests.api";
import type {
  GetLinkRequestsParams,
  ReviewLinkRequestParams,
} from "@/types/linkRequests.types";

export const useGetLinkRequests = (params: GetLinkRequestsParams) => {
  return useQuery({
    queryKey: ["linkRequests", params],
    queryFn: () => linkRequestsApi.getLinkRequests(params),
    staleTime: 30000,
    retry: 2,
  });
};

export const useReviewLinkRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ReviewLinkRequestParams) =>
      linkRequestsApi.reviewLinkRequest(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkRequests"] });
      queryClient.invalidateQueries({ queryKey: ["meters"] });
    },
  });
};
