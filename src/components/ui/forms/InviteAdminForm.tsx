import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { type FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useGetAdminRoles,
  useGetAdminGroups,
  useSendInvitation,
} from "@/hooks/useAdmins";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import SuccessIcon from "@/assets/success.svg";
import toast from "react-hot-toast";

const inviteSchema = z.object({
  adminEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  roleId: z.string().min(1, "Role is required"),
  groupId: z.string().min(1, "Group is required"),
});

type InviteFormData = z.infer<typeof inviteSchema>;

const inputSx = {
  "& .MuiOutlinedInput-root": {
    height: "56px",
    fontSize: "16px",
    borderRadius: "8px",
    "& fieldset": { borderColor: "#E0E0E0", borderWidth: "1.5px" },
    "&:hover fieldset": { borderColor: "#669900" },
    "&.Mui-focused fieldset": { borderColor: "#669900" },
  },
  "& .MuiFormHelperText-root": { marginLeft: "4px", fontSize: "12px" },
};

const selectSx = {
  height: "56px",
  borderRadius: "8px",
  fontSize: "16px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E0E0E0",
    borderWidth: "1.5px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#669900" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#669900" },
};

interface InviteAdminFormProps {
  onClose: () => void;
}

const InviteAdminForm: FC<InviteAdminFormProps> = ({ onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const { data: rolesData, isLoading: rolesLoading } = useGetAdminRoles();
  console.log("Roles data: ", rolesData);
  const { data: groupsData, isLoading: groupsLoading } = useGetAdminGroups();
  const { mutate: sendInvitation, isPending } = useSendInvitation();

  const roles = rolesData?.data ?? [];
  const groups = groupsData?.data ?? [];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { adminEmail: "", roleId: "", groupId: "" },
  });

  const onSubmit = (data: InviteFormData) => {
    setApiError("");
    sendInvitation(data, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => onClose(), 2000);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to send invitation. Please try again.";
        setApiError(message);
        toast.error(message);
      },
    });
  };

  if (showSuccess) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90%",
          p: 4,
        }}
      >
        <Box component="img" src={SuccessIcon} alt="Success" sx={{ mb: 2 }} />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#000000",
            textAlign: "center",
          }}
        >
          Invitation Sent Successfully
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            color: "#414141",
            textAlign: "center",
            mt: 1,
          }}
        >
          The admin will receive an email to complete their setup.
        </Typography>
      </Box>
    );
  }

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
          Add New Admin
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          Send an invitation to grant admin access
        </Typography>
      </Box>

      {/* API Error */}
      {apiError && (
        <Box
          sx={{
            p: 2,
            borderRadius: "8px",
            backgroundColor: "#FFEBEE",
            border: "1px solid #FFCDD2",
            mb: 3,
          }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "#C62828", fontWeight: 500 }}
          >
            {apiError}
          </Typography>
        </Box>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 3 }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Email */}
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "#000000",
                mb: "8px",
              }}
            >
              Email Address
            </Typography>
            <Controller
              name="adminEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="admin@example.com"
                  type="email"
                  error={!!errors.adminEmail}
                  helperText={errors.adminEmail?.message}
                  sx={inputSx}
                />
              )}
            />
          </Box>

          {/* Role */}
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "#000000",
                mb: "8px",
              }}
            >
              Role
            </Typography>
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.roleId}>
                  <Select
                    {...field}
                    displayEmpty
                    disabled={rolesLoading}
                    sx={selectSx}
                  >
                    <MenuItem value="" disabled>
                      <span style={{ color: "#9E9E9E" }}>
                        {rolesLoading ? "Loading roles..." : "Select a role"}
                      </span>
                    </MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 600,
                              textTransform: "capitalize",
                            }}
                          >
                            {role.name}
                          </Typography>
                          {role.description && (
                            <Typography
                              sx={{ fontSize: "12px", color: "#757575" }}
                            >
                              {role.description}
                            </Typography>
                          )}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.roleId && (
                    <FormHelperText sx={{ ml: "4px", fontSize: "12px" }}>
                      {errors.roleId.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box>

          {/* Group */}
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "#000000",
                mb: "8px",
              }}
            >
              Group
            </Typography>
            <Controller
              name="groupId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.groupId}>
                  <Select
                    {...field}
                    displayEmpty
                    disabled={groupsLoading}
                    sx={selectSx}
                  >
                    <MenuItem value="" disabled>
                      <span style={{ color: "#9E9E9E" }}>
                        {groupsLoading ? "Loading groups..." : "Select a group"}
                      </span>
                    </MenuItem>
                    {groups.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        <Box>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 600 }}
                          >
                            {group.name}
                          </Typography>
                          {group.description && (
                            <Typography
                              sx={{ fontSize: "12px", color: "#757575" }}
                            >
                              {group.description}
                            </Typography>
                          )}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.groupId && (
                    <FormHelperText sx={{ ml: "4px", fontSize: "12px" }}>
                      {errors.groupId.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #F5F5F5" }}>
          <Button
            type="submit"
            disabled={isPending}
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
              "&:disabled": { backgroundColor: "#BDBDBD", color: "#FFFFFF" },
            }}
          >
            {isPending ? (
              <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
            ) : (
              <>
                Send Invitation
                <Box
                  component="img"
                  src={ButtonArrowIcon}
                  alt="arrow"
                  sx={{ width: "20px", height: "20px" }}
                />
              </>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InviteAdminForm;
