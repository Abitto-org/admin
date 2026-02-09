import { useState } from "react";

export interface IOnCloseDisclosure {
  onClose: () => void;
}

const useDisclosure = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return {
    open,
    onOpen,
    onClose,
  };
};

export default useDisclosure;
