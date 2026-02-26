import type { FC } from "react";
import CustomDrawer from "./CustomDrawer";
import LinkRequestDetailsForm from "../forms/LinkRequestDetailsForm";
import type { LinkRequestDetailsData } from "@/types/linkRequests.types";
import { Box, Typography } from "@mui/material";

interface LinkRequestDrawerProps {
  linkRequestDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  requestData?: LinkRequestDetailsData;
}

const LinkRequestDrawer: FC<LinkRequestDrawerProps> = ({
  linkRequestDrawer,
  requestData,
}) => {
  return (
    <CustomDrawer
      open={linkRequestDrawer.open}
      onClose={linkRequestDrawer.onClose}
    >
      {requestData ? (
        <LinkRequestDetailsForm
          onClose={linkRequestDrawer.onClose}
          open={linkRequestDrawer.open}
          requestData={requestData}
        />
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography>No request data available</Typography>
        </Box>
      )}
    </CustomDrawer>
  );
};

export default LinkRequestDrawer;
