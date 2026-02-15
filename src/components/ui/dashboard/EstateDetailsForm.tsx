// EstateDetailsForm.tsx
import { Box, Typography, Button } from "@mui/material";
import { type FC } from "react";
import type { Estate } from "@/types/estates.types";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import { formatDate } from "@/utils";

interface EstateDetailsFormProps {
  onClose: () => void;
  estateData: Estate;
}

const EstateDetailsForm: FC<EstateDetailsFormProps> = ({
  onClose,
  estateData,
}) => {
  const status =
    Number.parseInt(estateData.totalMeters) > 0 ? "Active" : "Inactive";
  const statusColor = status === "Active" ? "#2E7D32" : "#EA0000";

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
          Estate Details
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          Complete information about this estate
        </Typography>
      </Box>

      {/* Content */}
      <Box
        className="no-scrollbar"
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {/* Status Badge */}
        <Box
          sx={{
            display: "inline-flex",
            px: 2,
            py: 1,
            borderRadius: "16px",
            backgroundColor: status === "Active" ? "#E8F5E9" : "#FFEBEE",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: statusColor,
              textTransform: "capitalize",
            }}
          >
            {status}
          </Typography>
        </Box>

        {/* Estate Details */}
        <Box>
          <DetailRow label="Estate Name" value={estateData.name} />
          <DetailRow label="Description" value={estateData.description} />
          <DetailRow label="Address" value={estateData.address} />
          <DetailRow label="City" value={estateData.city} />
          <DetailRow label="State" value={estateData.state} />
          <DetailRow label="Country" value={estateData.country} />
          <DetailRow label="Zip Code" value={estateData.zipCode} />
          <DetailRow label="Latitude" value={estateData.latitude} />
          <DetailRow label="Longitude" value={estateData.longitude} />
          <DetailRow label="Total Meters" value={estateData.totalMeters} />
          <DetailRow label="Online Meters" value={estateData.onlineMeters} />
          <DetailRow
            label="Date Created"
            value={formatDate(estateData.createdAt)}
          />
          <DetailRow
            label="Last Updated"
            value={formatDate(estateData.updatedAt)}
          />
        </Box>
      </Box>

      {/* Done Button */}
      <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #F5F5F5" }}>
        <Button
          onClick={onClose}
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

export default EstateDetailsForm;

const DetailRow: FC<{ label: string; value: string }> = ({ label, value }) => (
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
