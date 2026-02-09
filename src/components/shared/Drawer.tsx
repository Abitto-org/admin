import { type FC, type ReactNode } from "react";
import {
  Drawer as MuiDrawer,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Drawer: FC<DrawerProps> = ({ open, onClose, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MuiDrawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "#000000B2",
        },
        "& .MuiDrawer-paper": {
          width: isMobile ? "100%" : "35%",
          height: isMobile ? "auto" : "100%",
          maxHeight: isMobile ? "90vh" : "100%",
          borderTopLeftRadius: isMobile ? "16px" : 0,
          borderTopRightRadius: isMobile ? "16px" : 0,
          boxSizing: "border-box",
          position: "relative",
        },
      }}
    >
      {/* Close Button */}
      <Box
        sx={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 1,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            width: "24px",
            height: "24px",
            backgroundColor: "#FAFAFA",
            borderRadius: "50%",
            padding: 0,
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "15px", color: "#000000" }} />
        </IconButton>
      </Box>

      {/* Content */}
      <Box
        sx={{
          padding: { xs: "24px 16px", md: "24px" },
          paddingTop: "56px", // Space for close button
          height: "100%",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
