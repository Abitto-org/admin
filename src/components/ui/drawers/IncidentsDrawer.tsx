import { type FC } from "react";
import { Box, Typography } from "@mui/material";
import CustomDrawer from "./CustomDrawer";
import IncidentDetailsForm from "../forms/IncidentDetailsForm";
import type { IncidentReportItem } from "@/types/incidents.types";

interface IncidentDrawerProps {
  incidentDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  incident: IncidentReportItem | null;
}

const IncidentDrawer: FC<IncidentDrawerProps> = ({
  incidentDrawer,
  incident,
}) => {
  return (
    <CustomDrawer open={incidentDrawer.open} onClose={incidentDrawer.onClose}>
      {incident ? (
        <IncidentDetailsForm
          onClose={incidentDrawer.onClose}
          incident={incident}
        />
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography>No incident selected</Typography>
        </Box>
      )}
    </CustomDrawer>
  );
};

export default IncidentDrawer;
