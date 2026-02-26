import type { FC } from "react";
import LinkMeterForm from "../dashboard/LinkMeterForm";
import CustomDrawer from "./CustomDrawer";
import type { MeterActionData } from "@/types/meters.types";

interface LinkMeterDrawerProps {
  linkMeterDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  mode?: "link" | "unlink";
  meterData?: MeterActionData;
}

const LinkMeterDrawer: FC<LinkMeterDrawerProps> = ({
  linkMeterDrawer,
  mode = "link",
  meterData,
}) => {
  return (
    <CustomDrawer open={linkMeterDrawer.open} onClose={linkMeterDrawer.onClose}>
      <LinkMeterForm
        onClose={linkMeterDrawer.onClose}
        open={linkMeterDrawer.open}
        mode={mode}
        meterData={meterData}
      />
    </CustomDrawer>
  );
};

export default LinkMeterDrawer;
