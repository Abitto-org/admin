import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { usersApi } from "@/api/users.api";
import type { GetUsersParams,RegisterUserParams } from "@/types/users.types";
export const useGetUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => usersApi.getUsers(params),
    staleTime: 30000,
    retry: 2,
  });
};

export const useGetUserMeters = (userId: string) => {
  return useQuery({
    queryKey: ["userMeters", userId],
    queryFn: () => usersApi.getUserMeters(userId),
    enabled: !!userId,
    staleTime: 30000,
    retry: 2,
  });
};



export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RegisterUserParams) => usersApi.registerUser(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
