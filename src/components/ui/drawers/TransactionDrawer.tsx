import type { FC } from "react";
import CustomDrawer from "./CustomDrawer";
import TransactionDetailsForm from "../dashboard/TransactionDetailsForm";
import { Box, Typography } from "@mui/material";

interface TransactionDrawerProps {
  transactionDrawer: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  transactionId: string | null;
}

const TransactionDrawer: FC<TransactionDrawerProps> = ({
  transactionDrawer,
  transactionId,
}) => {
  return (
    <CustomDrawer
      open={transactionDrawer.open}
      onClose={transactionDrawer.onClose}
    >
      {transactionId ? (
        <TransactionDetailsForm
          onClose={transactionDrawer.onClose}
          transactionId={transactionId}
        />
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography>No transaction selected</Typography>
        </Box>
      )}
    </CustomDrawer>
  );
};

export default TransactionDrawer;
