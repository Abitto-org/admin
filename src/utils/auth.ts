import type { User } from "@/types/users.types";

export const ACCESS_TOKEN_KEY = "ABITTO_ACCESS_TOKEN";

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getInitials = (user: User | null | undefined) => {
  if (!user) return "AU";

  // If both firstName and lastName exist, use their initials
  if (user.firstName && user.lastName) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  // Otherwise, use first letter of email
  return user.email.charAt(0).toUpperCase();
};

export const getDisplayName = (user: User | null | undefined) => {
  if (!user) return "Admin User";

  // If both firstName and lastName exist, use them
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  // Otherwise, use email username (before @) and truncate if too long
  const emailUsername = user.email.split("@")[0];
  const maxLength = 20;

  if (user.email.length > maxLength) {
    return emailUsername.substring(0, maxLength) + "...";
  }

  return emailUsername;
};

export const getRole = (user: User | null | undefined) => {
  if (!user) return "Admin";

  // Remove hyphens/underscores and capitalize each word
  // "super-admin" -> "Super Admin", "basic-user" -> "Basic User"
  return user.role
    .replaceAll(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
