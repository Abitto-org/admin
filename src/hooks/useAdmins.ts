import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminsApi } from "@/api/admins.api";
import type {
  ChangeAdminRolePayload,
  GetInvitationsParams,
  SendInvitationPayload,
  CompleteSetupPayload,
} from "@/types/admins.types";

export const useGetAdmins = () =>
  useQuery({
    queryKey: ["admins"],
    queryFn: () => adminsApi.getAdmins(),
    staleTime: 30000,
    retry: 2,
  });

export const useGetAdminRoles = () =>
  useQuery({
    queryKey: ["admin-roles"],
    queryFn: () => adminsApi.getAdminRoles(),
    staleTime: 60000,
  });

export const useGetAdminGroups = () =>
  useQuery({
    queryKey: ["admin-groups"],
    queryFn: () => adminsApi.getAdminGroups(),
    staleTime: 60000,
  });

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

export const useGetInvitations = (params: GetInvitationsParams) =>
  useQuery({
    queryKey: ["invitations", params],
    queryFn: () => adminsApi.getInvitations(params),
    staleTime: 30000,
    retry: 2,
  });

export const useSendInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SendInvitationPayload) =>
      adminsApi.sendInvitation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
  });
};

export const useCancelInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminsApi.cancelInvitation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
  });
};

export const useCompleteSetup = () =>
  useMutation({
    mutationFn: (payload: CompleteSetupPayload) =>
      adminsApi.completeSetup(payload),
  });
