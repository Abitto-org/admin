import {
  Box,
  Typography,
  Avatar,
  Stack,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { type FC, useState } from "react";
import { getInitials } from "@/utils/auth";
import { formatDate } from "@/utils";
import type { User } from "@/types/users.types";
import {
  useChangeAdminRole,
  useDeleteAdmin,
  useGetAdminRoles,
} from "@/hooks/useAdmins";
import { useAuthStore } from "@/store/auth.store";
import useDisclosure from "@/hooks/useDisclosure";
import RoleGuard from "@/components/guards/RoleGuard";
import DeleteAdminDialog from "@/components/ui/modals/DeleteAdminDialog";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import toast from "react-hot-toast";

interface AdminDetailsFormProps {
  admin: User;
  onClose: () => void;
}

const getAdminFullName = (admin: User): string => {
  if (admin.firstName || admin.lastName) {
    return `${admin.firstName ?? ""} ${admin.lastName ?? ""}`.trim();
  }
  return admin.email;
};

const AdminDetailsForm: FC<AdminDetailsFormProps> = ({ admin, onClose }) => {
  const { data: rolesData, isLoading: rolesLoading } = useGetAdminRoles();
  const roles = rolesData?.data ?? [];

  const { user: currentUser } = useAuthStore();
  const isSelf = currentUser?.id === admin.id;

  const [selectedRoleId, setSelectedRoleId] = useState(admin.adminRoleId ?? "");
  const roleChanged = selectedRoleId !== (admin.adminRoleId ?? "");

  const changeRole = useChangeAdminRole();
  const deleteAdmin = useDeleteAdmin();
  const deleteDialog = useDisclosure();

  const fullName = getAdminFullName(admin);

  const selectedRoleLabel =
    roles.find((r) => r.id === selectedRoleId)?.name ?? admin.role ?? "—";

  const handleSaveRole = () => {
    if (!selectedRoleId) return;
    changeRole.mutate(
      { id: admin.id, payload: { adminRoleId: selectedRoleId } },
      {
        onSuccess: () => {
          toast.success("Admin role updated successfully");
          onClose();
        },
        onError: () => {
          toast.error("Failed to update role. Please try again.");
        },
      },
    );
  };

  const handleDelete = () => {
    deleteAdmin.mutate(admin.id, {
      onSuccess: () => {
        toast.success("Admin removed successfully");
        deleteDialog.onClose();
        onClose();
      },
      onError: () => {
        toast.error("Failed to remove admin. Please try again.");
      },
    });
  };

  // Read-only role display for non-super-admins
  const currentRoleLabel =
    roles.find((r) => r.id === admin.adminRoleId)?.name ??
    admin.adminRoleName ??
    admin.role ??
    "—";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "20px", md: "24px" },
            lineHeight: "120%",
            color: "#000000",
            mb: "8px",
          }}
        >
          Admin Profile
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          Details on admin
        </Typography>
      </Box>

      {/* Scrollable content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { backgroundColor: "#F5F5F5" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#BDBDBD",
            borderRadius: "3px",
          },
        }}
      >
        {/* Profile card */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            p: "16px",
            borderRadius: "8px",
            border: "1px solid #EAEAEA",
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              width: "48px",
              height: "48px",
              backgroundColor: "#3266CC",
              fontWeight: 600,
              fontSize: "16px",
              flexShrink: 0,
            }}
          >
            {getInitials(admin)}
          </Avatar>
          <Stack spacing="4px" sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                textTransform: "capitalize",
                color: "#000000",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {fullName}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "100%",
                color: "#757575",
              }}
            >
              {admin.email}
            </Typography>
          </Stack>
        </Box>

        <DetailRow label="Email" value={admin.email} />
        <DetailRow
          label="Last Seen"
          value={admin.updatedAt ? formatDate(admin.updatedAt) : "N/A"}
        />

        {/* Role row — editable for super-admin viewing others, read-only if viewing self */}
        <RoleGuard
          action="canChangeAdminRole"
          fallback={
            <DetailRow
              label="Role"
              value={
                <span style={{ textTransform: "capitalize" }}>
                  {currentRoleLabel}
                </span>
              }
            />
          }
        >
          {isSelf ? (
            <DetailRow
              label="Role"
              value={
                <span style={{ textTransform: "capitalize" }}>
                  {currentRoleLabel}
                </span>
              }
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
                borderBottom: "1px solid #F5F5F5",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#757575",
                  minWidth: "140px",
                }}
              >
                Role
              </Typography>
              <Select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
                displayEmpty
                disabled={rolesLoading}
                IconComponent={(props) => (
                  <Box
                    {...props}
                    sx={{
                      width: "14px",
                      height: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.5 5.25L7 8.75L10.5 5.25"
                        stroke="#808080"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                )}
                sx={{
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "#FAFAFA",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  border: roleChanged
                    ? "1.5px solid #669900"
                    : "1px solid #EAEAEA",
                  transition: "border 0.2s ease-in-out",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& .MuiSelect-select": {
                    padding: "0 28px 0 12px",
                    display: "flex",
                    alignItems: "center",
                    minWidth: "120px",
                  },
                  "& .MuiSelect-icon": { right: "8px" },
                }}
                renderValue={() => (
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "100%",
                      color: roleChanged ? "#669900" : "#000000",
                      textTransform: "capitalize",
                    }}
                  >
                    {rolesLoading ? "Loading..." : selectedRoleLabel}
                  </Typography>
                )}
              >
                {roles.map((role) => (
                  <MenuItem
                    key={role.id}
                    value={role.id}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}
        </RoleGuard>

        <DetailRow
          label="Active"
          value={
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 600,
                fontSize: "14px",
                color: admin.isActive ? "#2E7D32" : "#757575",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: admin.isActive ? "#2EAE4E" : "#9E9E9E",
                  display: "inline-block",
                }}
              />
              {admin.isActive ? "Active" : "Inactive"}
            </Box>
          }
        />
        <DetailRow
          label="Email Verified"
          value={admin.emailVerified ? "Yes" : "No"}
        />
        <DetailRow
          label="Archived"
          value={admin.isArchived ? `Yes — ${admin.archiveReason ?? ""}` : "No"}
        />
        <DetailRow
          label="Joined"
          value={admin.createdAt ? formatDate(admin.createdAt) : "N/A"}
        />
      </Box>

      {/* Footer — only super-admin viewing another admin sees these */}
      <RoleGuard action="canChangeAdminRole">
        {!isSelf && (
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: "1px solid #F5F5F5",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Button
              onClick={handleSaveRole}
              disabled={!roleChanged || changeRole.isPending}
              fullWidth
              sx={{
                height: "48px",
                borderRadius: "32px",
                padding: "12px 24px",
                backgroundColor: "#669900",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "16px",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                "&:hover": { backgroundColor: "#558000" },
                "&:disabled": { backgroundColor: "#CCCCCC", color: "#666666" },
              }}
            >
              {changeRole.isPending ? (
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
              ) : (
                <>
                  Save Changes
                  <Box
                    component="img"
                    src={ButtonArrowIcon}
                    alt="arrow"
                    sx={{ width: "20px", height: "20px" }}
                  />
                </>
              )}
            </Button>

            <RoleGuard action="canRemoveAdmin">
              <Button
                onClick={deleteDialog.onOpen}
                fullWidth
                variant="outlined"
                sx={{
                  height: "48px",
                  borderRadius: "32px",
                  padding: "12px 24px",
                  borderColor: "#EA0000",
                  color: "#EA0000",
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "capitalize",
                  "&:hover": {
                    borderColor: "#C70000",
                    backgroundColor: "#FEF3F2",
                  },
                }}
              >
                Remove Admin
              </Button>
            </RoleGuard>
          </Box>
        )}
      </RoleGuard>

      <DeleteAdminDialog
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
        onConfirm={handleDelete}
        adminName={fullName}
        isDeleting={deleteAdmin.isPending}
      />
    </Box>
  );
};

export default AdminDetailsForm;

const DetailRow: FC<{ label: string; value: string | React.ReactNode }> = ({
  label,
  value,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 2,
      borderBottom: "1px solid #F5F5F5",
    }}
  >
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "14px",
        color: "#757575",
        minWidth: "140px",
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "14px",
        color: "#000000",
        textAlign: "right",
        flex: 1,
        wordBreak: "break-word",
      }}
    >
      {value}
    </Typography>
  </Box>
);
