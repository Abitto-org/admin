import { useAuthStore } from "@/store/auth.store";

export type AppRole = "super-admin" | "admin" | "support" | "installer";

// Role hierarchy — higher index = more restricted
const ROLE_HIERARCHY: AppRole[] = [
  "super-admin",
  "admin",
  "support",
  "installer",
];

/**
 * Returns the effective role for the current user.
 * Prefers adminRoleName (granular) over role (broad admin/user split).
 */
export const getEffectiveRole = (user: {
  role?: string | null;
  adminRoleName?: string | null;
}): AppRole | null => {
  const raw = user.adminRoleName ?? user.role ?? null;
  if (!raw) return null;
  return ROLE_HIERARCHY.includes(raw as AppRole) ? (raw as AppRole) : null;
};

// ── Page access map ───────────────────────────────────────────────────────────
// true = role can access this route
export const PAGE_ACCESS: Record<string, AppRole[]> = {
  "/dashboard": ["super-admin", "admin", "support"],
  "/link-requests": ["super-admin", "admin", "support", "installer"],
  "/meters": ["super-admin", "admin", "support", "installer"],
  "/estates": ["super-admin", "admin", "support"],
  "/users": ["super-admin", "admin", "support", "installer"],
  "/users/:userId": ["super-admin", "admin", "support", "installer"],
  "/transactions": ["super-admin", "admin", "support"],
  "/incidents": ["super-admin", "admin", "support"],
  "/admin": ["super-admin"],
  "/help-center": ["super-admin", "admin", "support"],
  "/settings": ["super-admin", "admin"],
};

// ── Action permissions ────────────────────────────────────────────────────────
export const ACTION_PERMISSIONS = {
  // Admin & Roles page
  canInviteAdmin: ["super-admin"] as AppRole[],
  canRemoveAdmin: ["super-admin"] as AppRole[],
  canChangeAdminRole: ["super-admin"] as AppRole[],

  // Users
  canRegisterUser: ["super-admin", "admin"] as AppRole[],
  canDeleteUser: ["super-admin"] as AppRole[],

  // Meters
  canLinkMeter: ["super-admin", "admin", "installer"] as AppRole[],
  canUnlinkMeter: ["super-admin", "admin"] as AppRole[],

  // Incidents
  canResolveIncident: ["super-admin", "admin"] as AppRole[],

  // Settings
  canEditSettings: ["super-admin"] as AppRole[],

  // Estates
  canManageEstates: ["super-admin", "admin"] as AppRole[],
} as const;

export type ActionPermission = keyof typeof ACTION_PERMISSIONS;

// ── The hook ──────────────────────────────────────────────────────────────────
export const usePermissions = () => {
  const { user } = useAuthStore();

  const role: AppRole | null = user ? getEffectiveRole(user) : null;
  const isSuperAdmin = role === "super-admin";
  const isAdmin = role === "admin";
  const isSupport = role === "support";
  const isInstaller = role === "installer";

  /**
   * Check if the current user has one of the given roles.
   */
  const hasRole = (...roles: AppRole[]): boolean => {
    if (!role) return false;
    return roles.includes(role);
  };

  /**
   * Check if the current user can perform a named action.
   */
  const can = (action: ActionPermission): boolean => {
    if (!role) return false;
    return (ACTION_PERMISSIONS[action] as AppRole[]).includes(role);
  };

  /**
   * Check if the current user can access a given route path.
   */
  const canAccessPage = (path: string): boolean => {
    if (!role) return false;
    const allowed = PAGE_ACCESS[path];
    if (!allowed) return true;
    return allowed.includes(role);
  };

  return {
    role,
    isSuperAdmin,
    isAdmin,
    isSupport,
    isInstaller,
    hasRole,
    can,
    canAccessPage,
  };
};
