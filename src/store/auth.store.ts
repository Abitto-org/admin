import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user.types";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "@/utils/auth";
import { userApi } from "@/api/user.api";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        }),

      setToken: (token) => {
        setAccessToken(token);
        set({ isAuthenticated: true });
      },

      fetchUser: async () => {
        const token = getAccessToken();
        if (!token) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await userApi.getProfile();
          if (response.status === "success") {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Failed to fetch user profile";
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          // Clear invalid token
          // removeAccessToken();
        }
      },

      logout: () => {
        removeAccessToken();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      checkAuth: () => {
        const token = getAccessToken();
        const { user } = get();
        return !!(token && user);
      },
    }),
    {
      name: "abitto-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
