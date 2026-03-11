import type { FC } from "react";
import CustomDrawer from "./CustomDrawer";
import InviteAdminForm from "@/components/ui/forms/InviteAdminForm";

interface InviteAdminDrawerProps {
  inviteAdminDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
}

const InviteAdminDrawer: FC<InviteAdminDrawerProps> = ({
  inviteAdminDrawer,
}) => {
  return (
    <CustomDrawer
      open={inviteAdminDrawer.open}
      onClose={inviteAdminDrawer.onClose}
    >
      <InviteAdminForm onClose={inviteAdminDrawer.onClose} />
    </CustomDrawer>
  );
};

export default InviteAdminDrawer;
