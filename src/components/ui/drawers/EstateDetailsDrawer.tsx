// EstateDetailsDrawer.tsx
import type { FC } from "react";
import CustomDrawer from "./CustomDrawer";
import EstateDetailsForm from "../dashboard/EstateDetailsForm";
import type { Estate } from "@/types/estates.types";
import { Box, Typography } from "@mui/material";

interface EstateDetailsDrawerProps {
  estateDetailsDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  estateData?: Estate;
}

const EstateDetailsDrawer: FC<EstateDetailsDrawerProps> = ({
  estateDetailsDrawer,
  estateData,
}) => {
  return (
    <CustomDrawer
      open={estateDetailsDrawer.open}
      onClose={estateDetailsDrawer.onClose}
    >
      {estateData ? (
        <EstateDetailsForm
          onClose={estateDetailsDrawer.onClose}
          estateData={estateData}
        />
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography>No estate data available</Typography>
        </Box>
      )}
    </CustomDrawer>
  );
};

export default EstateDetailsDrawer;
