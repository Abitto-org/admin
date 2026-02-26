// useEstates.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { estatesApi } from "@/api/estates.api";
import type {
  GetEstatesParams,
  CreateEstateParams,
} from "@/types/estates.types";

export const useGetEstates = (params: GetEstatesParams) => {
  return useQuery({
    queryKey: ["estates", params],
    queryFn: () => estatesApi.getEstates(params),
    staleTime: 30000,
    retry: 2,
  });
};

export const useCreateEstate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateEstateParams) =>
      estatesApi.createEstate(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estates"] });
    },
  });
};