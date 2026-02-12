import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/api/users.api";
import type { GetUsersParams } from "@/types/users.types";

export const useGetUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => usersApi.getUsers(params),
    staleTime: 30000,
    retry: 2,
  });
};
