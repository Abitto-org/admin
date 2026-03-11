import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { PersonRemove as PersonRemoveIcon } from "@mui/icons-material";
import { type FC } from "react";
import type { IOnCloseDisclosure } from "@/hooks/useDisclosure";

interface DeleteAdminDialogProps extends IOnCloseDisclosure {
  open: boolean;
  adminName: string;
  onConfirm: () => void;
  isDeleting?: boolean;
}

const DeleteAdminDialog: FC<DeleteAdminDialogProps> = ({
  open,
  onClose,
  onConfirm,
  adminName,
  isDeleting = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "12px", padding: "8px" },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "20px 24px 16px",
        }}
      >
        <Box
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#FEF3F2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <PersonRemoveIcon sx={{ color: "#EA0000", fontSize: "24px" }} />
        </Box>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#000000",
          }}
        >
          Remove Admin
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ padding: "0 24px 24px" }}>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#667085",
          }}
        >
          Are you sure you want to remove{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#000000" }}>
            {adminName}
          </Box>
          ? This action cannot be undone and they will lose all admin access.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ padding: "0 24px 20px", gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={isDeleting}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "14px",
            padding: "10px 18px",
            borderRadius: "8px",
            borderColor: "#D0D5DD",
            color: "#344054",
            "&:hover": { borderColor: "#D0D5DD", backgroundColor: "#F9FAFB" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "14px",
            padding: "10px 18px",
            borderRadius: "8px",
            backgroundColor: "#EA0000",
            minWidth: "100px",
            "&:hover": { backgroundColor: "#C70000" },
            "&:disabled": { backgroundColor: "#F5A0A0", color: "#FFFFFF" },
          }}
        >
          {isDeleting ? (
            <CircularProgress size={16} sx={{ color: "#FFFFFF" }} />
          ) : (
            "Remove"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAdminDialog;
