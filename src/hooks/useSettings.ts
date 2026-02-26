import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsApi } from "@/api/settings.api";
import type { UpdateSettingsPayload } from "@/types/settings.types";

export const useGetSettings = () => {
  return useQuery({
    queryKey: ["GET_SETTINGS"],
    queryFn: () => settingsApi.getSettings(),
    staleTime: 30000,
    retry: 2,
  });
};

export const useEditSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSettingsPayload) =>
      settingsApi.updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_SETTINGS"] });
    },
  });
};
