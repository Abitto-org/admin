import type { FC } from "react";
import CustomDrawer from "./CustomDrawer";
import AddEstateForm from "../dashboard/AddEstateForm";

interface AddEstateDrawerProps {
  addEstateDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
}

const AddEstateDrawer: FC<AddEstateDrawerProps> = ({ addEstateDrawer }) => {
  return (
    <CustomDrawer open={addEstateDrawer.open} onClose={addEstateDrawer.onClose}>
      <AddEstateForm
        onClose={addEstateDrawer.onClose}
        open={addEstateDrawer.open}
      />
    </CustomDrawer>
  );
};

export default AddEstateDrawer;
