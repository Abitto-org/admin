import { Box, Typography, Button, Chip, TextField } from "@mui/material";
import { type FC, useState } from "react";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import { formatDate } from "@/utils";
import type { IncidentReportItem, IncidentType } from "@/types/incidents.types";
import { useResolveIncident } from "@/hooks/useIncidents";
import toast from "react-hot-toast";

interface IncidentDetailsFormProps {
  onClose: () => void;
  incident: IncidentReportItem;
}

const TYPE_CONFIG: Record<
  IncidentType,
  {
    label: string;
    bg: string;
    text: string;
    severity: string;
    severityBg: string;
    severityText: string;
  }
> = {
  leakage_detection: {
    label: "Leakage Detection",
    bg: "#FFF3E0",
    text: "#E65100",
    severity: "High",
    severityBg: "#FFEBEE",
    severityText: "#EA0000",
  },
  device_tampering: {
    label: "Device Tampering",
    bg: "#FCE4EC",
    text: "#880E4F",
    severity: "Medium",
    severityBg: "#FFF9C4",
    severityText: "#F57F17",
  },
};

const STATUS_CONFIG = {
  detected: { bg: "#FFEBEE", text: "#EA0000", label: "Detected" },
  resolved: { bg: "#E8F5E9", text: "#2E7D32", label: "Resolved" },
};

const IncidentDetailsForm: FC<IncidentDetailsFormProps> = ({
  onClose,
  incident,
}) => {
  const { report, meter, user } = incident;
  const [resolutionNote, setResolutionNote] = useState("");
  const typeConfig = TYPE_CONFIG[report.type] ?? {
    label: report.type.replace(/_/g, " "),
    bg: "#F5F5F5",
    text: "#757575",
    icon: "📋",
    severity: "Unknown",
    severityBg: "#F5F5F5",
    severityText: "#757575",
  };
  const statusConfig =
    STATUS_CONFIG[report.status] ?? STATUS_CONFIG["detected"];

  const resolveIncident = useResolveIncident();
  const isDetected = report.status === "detected";
  const canResolve = resolutionNote.trim().length > 0;

  const handleResolve = () => {
    resolveIncident.mutate(
      { id: report.id, notes: resolutionNote.trim() },
      {
      onSuccess: () => {
        setResolutionNote("");
        onClose();
      },
      onError: () => {
        toast.error("Failed to resolve incident");
      },
      },
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "20px", md: "24px" },
              lineHeight: "120%",
              color: "#000000",
            }}
          >
            Incident Details
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          Full information about this incident report
        </Typography>
      </Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { backgroundColor: "#F5F5F5" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#BDBDBD",
            borderRadius: "3px",
          },
        }}
      >
        {/* Type + Status chips */}
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 3 }}>
          <Chip
            label={typeConfig.label}
            sx={{
              backgroundColor: typeConfig.bg,
              color: typeConfig.text,
              fontWeight: 600,
              fontSize: "12px",
              borderRadius: "16px",
            }}
          />
          <Chip
            label={typeConfig.severity + " Severity"}
            sx={{
              backgroundColor: typeConfig.severityBg,
              color: typeConfig.severityText,
              fontWeight: 600,
              fontSize: "12px",
              borderRadius: "16px",
            }}
          />
          <Chip
            label={statusConfig.label}
            sx={{
              backgroundColor: statusConfig.bg,
              color: statusConfig.text,
              fontWeight: 600,
              fontSize: "12px",
              borderRadius: "16px",
            }}
          />
        </Box>

        {/* Incident Info */}
        <SectionTitle title="Incident Information" />
        <DetailRow label="Type" value={typeConfig.label} />
        <DetailRow label="Status" value={statusConfig.label} />
        <DetailRow
          label="Detected At"
          value={report.detectedAt ? formatDate(report.detectedAt) : "N/A"}
        />
        {/* Resolution Info */}
        {report.status === "resolved" && (
          <>
            <SectionTitle title="Resolution" />
            <DetailRow
              label="Resolved At"
              value={report.resolvedAt ? formatDate(report.resolvedAt) : "N/A"}
            />
            <DetailRow label="Resolved By" value={report.resolvedBy ?? "N/A"} />
            <DetailRow label="Notes" value={report.resolutionNotes ?? "N/A"} />
          </>
        )}

        {/* Meter Info */}
        <SectionTitle title="Meter Information" />
        <DetailRow label="Meter Number" value={meter?.meterNumber ?? "N/A"} />
        <DetailRow label="Meter Status" value={meter?.status ?? "N/A"} />
        <DetailRow
          label="Valve Status"
          value={
            meter?.valveStatus == null
              ? "N/A"
              : meter.valveStatus
                ? "Open"
                : "Closed"
          }
        />
        <DetailRow label="House Number" value={meter?.houseNumber ?? "N/A"} />
        <DetailRow label="Estate Name" value={meter?.estateName ?? "N/A"} />
        <DetailRow
          label="Available Gas"
          value={
            meter?.availableGasKg == null ? "N/A" : `${meter.availableGasKg} kg`
          }
        />
        <DetailRow
          label="Online Status"
          value={
            meter?.isOnline == null ? (
              "N/A"
            ) : (
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: meter.isOnline ? "#2EAE4E" : "#9E9E9E",
                    display: "inline-block",
                  }}
                />
                {meter.isOnline ? "Online" : "Offline"}
              </Box>
            )
          }
        />
        <DetailRow
          label="Last Seen"
          value={meter?.lastSeenAt ? formatDate(meter.lastSeenAt) : "N/A"}
        />

        {/* User Info */}
        <SectionTitle title="User Information" />
        <DetailRow
          label="Name"
          value={
            user?.firstname || user?.lastname
              ? `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim()
              : "N/A"
          }
        />
        <DetailRow label="Email" value={user?.email ?? "N/A"} />

        {isDetected && (
          <Box sx={{ mt: 3 }}>
            <SectionTitle title="Resolution Note" />
            <TextField
              fullWidth
              multiline
              minRows={4}
              placeholder="Type a resolution note"
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              disabled={resolveIncident.isPending}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#FFFFFF",
                },
              }}
            />
          </Box>
        )}
      </Box>

      {/* Footer Buttons */}
      <Box
        sx={{
          mt: 4,
          pt: 3,
          borderTop: "1px solid #F5F5F5",
          display: "flex",
          gap: 2,
        }}
      >
        {isDetected && (
          <Button
            onClick={handleResolve}
            disabled={resolveIncident.isPending || !canResolve}
            fullWidth
            sx={{
              height: "48px",
              borderRadius: "32px",
              padding: "12px 24px",
              backgroundColor: "#669900",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "16px",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              "&:hover": { backgroundColor: "#558000" },
              "&:disabled": { backgroundColor: "#BDBDBD", color: "#FFFFFF" },
            }}
          >
            {resolveIncident.isPending ? "Resolving..." : "Mark as Resolved"}
            {!resolveIncident.isPending && (
              <Box
                component="img"
                src={ButtonArrowIcon}
                alt="arrow"
                sx={{ width: "20px", height: "20px" }}
              />
            )}
          </Button>
        )}
        <Button
          onClick={onClose}
          fullWidth={!isDetected}
          variant={isDetected ? "outlined" : "contained"}
          sx={
            isDetected
              ? {
                  height: "48px",
                  borderRadius: "32px",
                  padding: "12px 24px",
                  borderColor: "#E0E0E0",
                  color: "#424242",
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "capitalize",
                  "&:hover": {
                    borderColor: "#BDBDBD",
                    backgroundColor: "#F5F5F5",
                  },
                }
              : {
                  height: "48px",
                  borderRadius: "32px",
                  padding: "12px 24px",
                  backgroundColor: "#669900",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  "&:hover": { backgroundColor: "#558000" },
                }
          }
        >
          {isDetected ? (
            "Close"
          ) : (
            <>
              Done
              <Box
                component="img"
                src={ButtonArrowIcon}
                alt="arrow"
                sx={{ width: "20px", height: "20px" }}
              />
            </>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default IncidentDetailsForm;

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
    sx={{ fontWeight: 700, fontSize: "16px", color: "#000000", mt: 3, mb: 2 }}
  >
    {title}
  </Typography>
);
