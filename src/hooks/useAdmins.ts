import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminsApi } from "@/api/admins.api";
import type { ChangeAdminRolePayload } from "@/types/admins.types";

export const useGetAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: () => adminsApi.getAdmins(),
    staleTime: 30000,
    retry: 2,
  });
};

export const useChangeAdminRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ChangeAdminRolePayload;
    }) => adminsApi.changeAdminRole(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminsApi.deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
};
