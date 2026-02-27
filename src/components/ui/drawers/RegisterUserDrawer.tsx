import type { FC } from "react";
import CustomDrawer from "./CustomDrawer";
import RegisterUserForm from "@/components/ui/forms/RegisterUserForm";

interface RegisterUserDrawerProps {
  registerUserDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
}

const RegisterUserDrawer: FC<RegisterUserDrawerProps> = ({
  registerUserDrawer,
}) => {
  return (
    <CustomDrawer
      open={registerUserDrawer.open}
      onClose={registerUserDrawer.onClose}
    >
      <RegisterUserForm
        onClose={registerUserDrawer.onClose}
        open={registerUserDrawer.open}
      />
    </CustomDrawer>
  );
};

export default RegisterUserDrawer;
