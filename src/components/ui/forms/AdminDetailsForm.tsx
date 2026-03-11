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
import { useChangeAdminRole, useDeleteAdmin } from "@/hooks/useAdmins";
import useDisclosure from "@/hooks/useDisclosure";
import DeleteAdminDialog from "@/components/ui/modals/DeleteAdminDialog";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import toast from "react-hot-toast";

const ROLE_OPTIONS = [
  { label: "Super Admin", value: "super-admin" },
  { label: "Admin", value: "admin" },
  { label: "Support", value: "support" },
];

// Maps adminRoleName → adminRoleId. Extend when you have all IDs from the API.
// For now, we use adminRoleName as a stand-in since the PATCH expects adminRoleId.
// The select drives role display; on save we send the adminRoleId if known.
const ROLE_ID_MAP: Record<string, string> = {
  // Fill these in with real IDs from your /admin/roles endpoint if available
  // "super-admin": "87880d70-fa39-4e58-b882-aadec7cec21f",
  // "support": "b0212a4f-a366-403f-96b2-1cd25be77711",
};

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
  const currentRole = admin.role ?? "";
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const roleChanged = selectedRole !== currentRole;

  const changeRole = useChangeAdminRole();
  const deleteAdmin = useDeleteAdmin();
  const deleteDialog = useDisclosure();

  const fullName = getAdminFullName(admin);

  const handleSaveRole = () => {
    // Prefer a known adminRoleId; fall back to the selectedRole string
    const adminRoleId =
      ROLE_ID_MAP[selectedRole] ?? admin.adminRoleId ?? selectedRole;
    changeRole.mutate(
      { id: admin.id, payload: { adminRoleId } },
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
            borderRadius: "8px",
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

        {/* Detail rows */}
        <DetailRow label="Email" value={admin.email} />
        <DetailRow
          label="Last Seen"
          value={admin.updatedAt ? formatDate(admin.updatedAt) : "N/A"}
        />

        {/* Role selector */}
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
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            displayEmpty
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
              lineHeight: "100%",
              color: "#000000",
              border: roleChanged ? "1.5px solid #669900" : "1px solid #EAEAEA",
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
            renderValue={(value) => {
              const option = ROLE_OPTIONS.find((o) => o.value === value);
              return (
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    color: roleChanged ? "#669900" : "#000000",
                    textTransform: "capitalize",
                  }}
                >
                  {option?.label ?? value}
                </Typography>
              );
            }}
          >
            {ROLE_OPTIONS.map((opt) => (
              <MenuItem
                key={opt.value}
                value={opt.value}
                sx={{ fontSize: "14px", fontWeight: 600 }}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Status rows */}
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

      {/* Footer actions */}
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
        {/* Save role change */}
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

        {/* Remove admin */}
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
            "&:hover": { borderColor: "#C70000", backgroundColor: "#FEF3F2" },
          }}
        >
          Remove Admin
        </Button>
      </Box>

      {/* Delete confirmation dialog */}
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

// ── helpers ──────────────────────────────────────────────────────────────────

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
