import { useQuery } from "@tanstack/react-query";
import { activitiesApi } from "@/api/activities.api";

export const useGetActivities = () => {
  return useQuery({
    queryKey: ["GET_ACTIVITIES"],
    queryFn: () => activitiesApi.getActivities({ limit: 10 }),
    staleTime: 30000,
    retry: 2,
  });
};
