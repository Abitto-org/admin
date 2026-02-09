import { type FC, type ReactNode } from "react";
import { SwipeableDrawer, Box, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  children: ReactNode;
}

const CustomDrawer: FC<CustomDrawerProps> = ({
  open,
  onClose,
  onOpen = () => {},
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <SwipeableDrawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableSwipeToOpen={!isMobile}
      disableDiscovery={!isMobile}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : "30%",
          height: isMobile ? "50vh" : "100%",
          borderRadius: isMobile ? "16px 16px 0 0" : 0,
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Sticky Header with Swipe Indicator and Close Button */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          flexShrink={0}
          bgcolor="#ffffff"
          width="100%"
          pt={isMobile ? "8px" : "16px"}
          px="16px"
        >
          {/* Swipe indicator for mobile */}
          {isMobile && (
            <Box
              sx={{
                width: "40px",
                height: "4px",
                bgcolor: "#BDBDBD",
                borderRadius: "2px",
                mb: "8px",
              }}
            />
          )}

          {/* Close Button */}
        </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="end"
          mb="6px"
          mr={{ xs: "16px", md: "24px" }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              bgcolor: "#FAFAFA",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "#F5F5F5",
              },
            }}
            onClick={onClose}
          >
            <CloseIcon
              sx={{
                fontSize: "15px",
                color: "#000000",
              }}
            />
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            px: { xs: "16px", md: "24px" },
            pb: "24px",
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default CustomDrawer;
