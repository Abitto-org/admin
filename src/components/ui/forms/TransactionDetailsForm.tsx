import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { type FC } from "react";
import { useGetSingleTransaction } from "@/hooks/useTransactions";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import { formatDate } from "@/utils";

interface TransactionDetailsFormProps {
  onClose: () => void;
  transactionId: string;
}

const TransactionDetailsForm: FC<TransactionDetailsFormProps> = ({
  onClose,
  transactionId,
}) => {
  const { data, isLoading, isError } = useGetSingleTransaction(transactionId);

  const formatAmount = (amount: string | number) => {
    const numAmount =
      typeof amount === "string" ? Number.parseFloat(amount) : amount;
    return `₦${(numAmount / 100).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return { bg: "#E8F5E9", text: "#2E7D32" };
      case "PENDING":
        return { bg: "#FFF9C4", text: "#F57F17" };
      case "FAILED":
        return { bg: "#FFEBEE", text: "#EA0000" };
      default:
        return { bg: "#F5F5F5", text: "#757575" };
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress sx={{ color: "#669900" }} />
      </Box>
    );
  }

  if (isError || !data?.data) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography sx={{ color: "#EA0000", textAlign: "center" }}>
          Failed to load transaction details
        </Typography>
      </Box>
    );
  }

  const transaction = data.data;
  const statusColors = getStatusColor(transaction.status);
  const isGasPurchase = transaction.type === "GAS_PURCHASE_ONLINE";
  const metadata = transaction.metadata;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "20px", md: "24px" },
            lineHeight: "120%",
            color: "#000000",
            mb: "8px",
          }}
        >
          Transaction Details
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          Complete information about this transaction
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F5F5F5",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#BDBDBD",
            borderRadius: "3px",
          },
        }}
      >
        {/* Status Badge */}
        <Box
          sx={{
            display: "inline-flex",
            px: 2,
            py: 1,
            borderRadius: "16px",
            backgroundColor: statusColors.bg,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: statusColors.text,
              textTransform: "capitalize",
            }}
          >
            {transaction.status}
          </Typography>
        </Box>

        {/* Basic Information */}
        <Box>
          <DetailRow label="Reference" value={transaction.reference} />
          <DetailRow label="Amount" value={formatAmount(transaction.amount)} />
          <DetailRow label="Type" value={transaction.type.replace(/_/g, " ")} />
          <DetailRow label="Provider" value={transaction.provider} />
          <DetailRow label="Description" value={transaction.description} />
          <DetailRow
            label="Created At"
            value={formatDate(transaction.createdAt)}
          />
          <DetailRow
            label="Updated At"
            value={formatDate(transaction.updatedAt)}
          />
        </Box>

        {/* User Information */}
        {transaction.user && (
          <>
            <SectionTitle title="User Information" />
            <Box>
              <DetailRow
                label="Name"
                value={`${transaction.user.firstName} ${transaction.user.lastName}`}
              />
              <DetailRow label="Email" value={transaction.user.email} />
              <DetailRow
                label="Phone"
                value={transaction.user.phoneNumber || "N/A"}
              />
              <DetailRow
                label="Username"
                value={transaction.user.username || "N/A"}
              />
            </Box>
          </>
        )}

        {/* Gas Purchase Details */}
        {isGasPurchase && metadata?.metadata && (
          <>
            <SectionTitle title="Gas Purchase Details" />
            <Box>
              <DetailRow
                label="Meter ID"
                value={metadata.metadata.meterId || "N/A"}
              />
              <DetailRow
                label="KG Purchased"
                value={
                  metadata.metadata.kgPurchased
                    ? `${metadata.metadata.kgPurchased} kg`
                    : "N/A"
                }
              />
              <DetailRow
                label="Price Per KG"
                value={
                  metadata.metadata.gasPricePerKg
                    ? formatAmount(
                        Number.parseFloat(metadata.metadata.gasPricePerKg) *
                          100,
                      )
                    : "N/A"
                }
              />
            </Box>
          </>
        )}

        {/* Payment Information */}
        {metadata?.authorization && (
          <>
            <SectionTitle title="Payment Information" />
            <Box>
              <DetailRow label="Channel" value={metadata.channel || "N/A"} />
              <DetailRow
                label="Card Brand"
                value={metadata.authorization.brand?.toUpperCase() || "N/A"}
              />
              <DetailRow
                label="Card Last 4"
                value={metadata.authorization.last4 || "N/A"}
              />
              <DetailRow
                label="Card Type"
                value={metadata.authorization.card_type || "N/A"}
              />
              <DetailRow
                label="Bank"
                value={metadata.authorization.bank || "N/A"}
              />
              <DetailRow
                label="Country"
                value={metadata.authorization.country_code || "N/A"}
              />
              <DetailRow
                label="Expiry"
                value={
                  metadata.authorization.exp_month &&
                  metadata.authorization.exp_year
                    ? `${metadata.authorization.exp_month}/${metadata.authorization.exp_year}`
                    : "N/A"
                }
              />
              <DetailRow
                label="Reusable"
                value={metadata.authorization.reusable ? "Yes" : "No"}
              />
            </Box>
          </>
        )}

        {/* Transaction Metadata */}
        {metadata && (
          <>
            <SectionTitle title="Transaction Metadata" />
            <Box>
              <DetailRow
                label="Gateway Response"
                value={metadata.gateway_response || "N/A"}
              />
              <DetailRow label="Currency" value={metadata.currency || "N/A"} />
              <DetailRow
                label="Fees"
                value={metadata.fees ? formatAmount(metadata.fees) : "N/A"}
              />
              <DetailRow
                label="IP Address"
                value={metadata.ip_address || "N/A"}
              />
              {metadata.paid_at && (
                <DetailRow
                  label="Paid At"
                  value={formatDate(metadata.paid_at)}
                />
              )}
            </Box>
          </>
        )}
      </Box>

      {/* Done Button */}
      <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #F5F5F5" }}>
        <Button
          onClick={onClose}
          fullWidth
          sx={{
            height: "48px",
            borderRadius: "32px",
            padding: "12px 24px",
            backgroundColor: "#669900",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "100%",
            textTransform: "capitalize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            "&:hover": {
              backgroundColor: "#558000",
            },
          }}
        >
          Done
          <Box
            component="img"
            src={ButtonArrowIcon}
            alt="arrow"
            sx={{
              width: "20px",
              height: "20px",
            }}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionDetailsForm;

const DetailRow: FC<{ label: string; value: string | React.ReactNode }> = ({
  label,
  value,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      py: 2,
      borderBottom: "1px solid #F5F5F5",
    }}
  >
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "14px",
        color: "#757575",
        minWidth: "140px",
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "14px",
        color: "#000000",
        textAlign: "right",
        flex: 1,
        wordBreak: "break-word",
      }}
    >
      {value}
    </Typography>
  </Box>
);
const SectionTitle: FC<{ title: string }> = ({ title }) => (
  <Typography
    sx={{
      fontWeight: 700,
      fontSize: "16px",
      color: "#000000",
      mt: 3,
      mb: 2,
    }}
  >
    {title}
  </Typography>
);
