import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { type FC } from "react";
import { Logout as LogoutIcon } from "@mui/icons-material";
import type { IOnCloseDisclosure } from "@/hooks/useDisclosure";

interface LogoutConfirmDialogProps extends IOnCloseDisclosure {
  open: boolean;
  onConfirm: () => void;
}

const LogoutConfirmDialog: FC<LogoutConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          padding: "8px",
        },
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
          }}
        >
          <LogoutIcon sx={{ color: "#EA0000", fontSize: "24px" }} />
        </Box>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#000000",
          }}
        >
          Logout
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
          Are you sure you want to logout? You will need to sign in again to
          access your account.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "0 24px 20px",
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "14px",
            padding: "10px 18px",
            borderRadius: "8px",
            borderColor: "#D0D5DD",
            color: "#344054",
            "&:hover": {
              borderColor: "#D0D5DD",
              backgroundColor: "#F9FAFB",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "14px",
            padding: "10px 18px",
            borderRadius: "8px",
            backgroundColor: "#EA0000",
            "&:hover": {
              backgroundColor: "#C70000",
            },
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmDialog;