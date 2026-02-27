import {
  Box,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { type FC, useState, useEffect } from "react";
import { useReviewLinkRequest } from "@/hooks/useLinkRequests";
import type { LinkRequestDetailsData } from "@/types/linkRequests.types";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import SuccessIcon from "@/assets/success.svg";
import { formatDate } from "@/utils";

interface LinkRequestDetailsFormProps {
  onClose: () => void;
  open?: boolean;
  requestData: LinkRequestDetailsData;
}

const LinkRequestDetailsForm: FC<LinkRequestDetailsFormProps> = ({
  onClose,
  open = true,
  requestData,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [action, setAction] = useState<"approved" | "rejected" | null>(null);
  const [reason, setReason] = useState("");
  const [apiError, setApiError] = useState<string>("");

  const { mutate: reviewRequest, isPending: isReviewing } =
    useReviewLinkRequest();

  useEffect(() => {
    if (open) {
      queueMicrotask(() => {
        setShowSuccess(false);
        setAction(null);
        setReason("");
        setApiError("");
      });
    }
  }, [open]);

  const handleReview = (reviewAction: "approved" | "rejected") => {
    setAction(reviewAction);
    setApiError("");

    reviewRequest(
      {
        id: requestData.id,
        status: reviewAction,
        ...(reason && { reason }),
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setTimeout(() => {
            onClose();
          }, 2000);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            `Failed to ${reviewAction === "approved" ? "approve" : "reject"} request. Please try again.`;
          setApiError(errorMessage);
          setAction(null);
        },
      },
    );
  };

  if (showSuccess) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90%",
          p: 4,
        }}
      >
        <Box component={"img"} src={SuccessIcon} alt="Success" />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#000000",
            textAlign: "center",
            mt: 2,
          }}
        >
          Request {action === "approved" ? "Approved" : "Rejected"} Successfully
        </Typography>
      </Box>
    );
  }

  const isRequestPending = requestData.status === "pending";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // height: "100%",
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
          Link Request Details
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          Review the meter linking request information
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* API Error Message */}
        {apiError && (
          <Box
            sx={{
              p: 2,
              borderRadius: "8px",
              backgroundColor: "#FFEBEE",
              border: "1px solid #FFCDD2",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#C62828",
                fontWeight: 500,
              }}
            >
              {apiError}
            </Typography>
          </Box>
        )}

        {/* Status Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignSelf: "flex-start",
            px: 2,
            py: 1,
            borderRadius: "16px",
            backgroundColor:
              requestData.status === "approved"
                ? "#E8F5E9"
                : requestData.status === "rejected"
                  ? "#FFEBEE"
                  : "#FFF9C4",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color:
                requestData.status === "approved"
                  ? "#2E7D32"
                  : requestData.status === "rejected"
                    ? "#EA0000"
                    : "#F57F17",
              textTransform: "capitalize",
            }}
          >
            {requestData.status}
          </Typography>
        </Box>

        {/* Request Details */}
        <Box sx={{ mb: 3 }}>
          <DetailRow label="Meter Number" value={requestData.meterNumber} />
          <DetailRow label="User Name" value={requestData.userName} />
          <DetailRow label="User Email" value={requestData.userEmail} />
          <DetailRow label="Request Type" value={requestData.requestType} />
          <DetailRow
            label="House Number"
            value={requestData.houseNumber || "N/A"}
          />
          <DetailRow label="Estate" value={requestData.estateName || "N/A"} />
          <DetailRow
            label="Date Requested"
            value={formatDate(requestData.createdAt)}
          />
          {requestData.reason && (
            <DetailRow label="Reason" value={requestData.reason} />
          )}
        </Box>

        {/* Reason Input (Optional) */}
        {isRequestPending && (
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "#000000",
                mb: "8px",
              }}
            >
              Reason (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add a reason for your decision..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "#E0E0E0",
                    borderWidth: "1.5px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#669900",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#669900",
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>

      {/* Action Buttons */}
      {isRequestPending && (
        <Box
          sx={{
            // mb: 10,
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          {/* Reject Button */}
          <Button
            onClick={() => handleReview("rejected")}
            disabled={isReviewing}
            sx={{
              height: "48px",
              borderRadius: "32px",
              padding: "12px 24px",
              backgroundColor: "#FFFFFF",
              color: "#EA0000",
              border: "1.5px solid #EA0000",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "100%",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              minWidth: "150px",
              "&:hover": {
                backgroundColor: "#FFEBEE",
                border: "1.5px solid #EA0000",
              },
              "&:disabled": {
                backgroundColor: "#F5F5F5",
                color: "#BDBDBD",
                border: "1.5px solid #E0E0E0",
              },
            }}
          >
            {isReviewing && action === "rejected" ? (
              <>
                Reject
                <CircularProgress
                  size={20}
                  sx={{
                    color: "#EA0000",
                  }}
                />
              </>
            ) : (
              "Reject"
            )}
          </Button>

          {/* Approve Button */}
          <Button
            onClick={() => handleReview("approved")}
            disabled={isReviewing}
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
              gap: "12px",
              minWidth: "150px",
              "&:hover": {
                backgroundColor: "#558000",
              },
              "&:disabled": {
                backgroundColor: "#BDBDBD",
                color: "#FFFFFF",
              },
            }}
          >
            {isReviewing && action === "approved" ? (
              <>
                Approve
                <CircularProgress
                  size={20}
                  sx={{
                    color: "#FFFFFF",
                  }}
                />
              </>
            ) : (
              <>
                Approve
                <Box
                  component="img"
                  src={ButtonArrowIcon}
                  alt="arrow"
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </>
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LinkRequestDetailsForm;

const DetailRow: FC<{ label: string; value: string }> = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 2,
      borderBottom: "1px solid #F5F5F5",
    }}
  >
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "14px",
        color: "#757575",
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
        maxWidth: "60%",
        wordBreak: "break-word",
      }}
    >
      {value}
    </Typography>
  </Box>
);
