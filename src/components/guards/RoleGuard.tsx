import { type FC, type ReactNode } from "react";
import {
  usePermissions,
  type AppRole,
  type ActionPermission,
} from "@/hooks/usePermissions";

interface RoleGuardProps {
  /** Render children only if user has one of these roles */
  roles?: AppRole[];
  /** Render children only if user can perform this action */
  action?: ActionPermission;
  /** What to render if access is denied (default: nothing) */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Conditionally renders children based on the current user's role or action permission.
 *
 * Usage — role-based:
 *   <RoleGuard roles={["super-admin"]}>
 *     <Button>Delete Admin</Button>
 *   </RoleGuard>
 *
 * Usage — action-based:
 *   <RoleGuard action="canInviteAdmin">
 *     <Button>Add New Admin</Button>
 *   </RoleGuard>
 *
 * Usage — with fallback:
 *   <RoleGuard action="canChangeAdminRole" fallback={<ReadOnlyRoleBadge />}>
 *     <RoleSelect />
 *   </RoleGuard>
 */
const RoleGuard: FC<RoleGuardProps> = ({
  roles,
  action,
  fallback = null,
  children,
}) => {
  const { hasRole, can } = usePermissions();

  let hasAccess = false;

  if (roles) {
    hasAccess = hasRole(...roles);
  } else if (action) {
    hasAccess = can(action);
  } else {
    hasAccess = true;
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default RoleGuard;
