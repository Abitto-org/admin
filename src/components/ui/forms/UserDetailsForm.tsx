import {
  Box,
  Typography,
  Button,
  Skeleton,
  Collapse,
  IconButton,
} from "@mui/material";
import { type FC, useState } from "react";
import { useGetUserMeters } from "@/hooks/useUsers";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import { formatDate } from "@/utils";
import type { User } from "@/types/users.types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface UserDetailsFormProps {
  onClose: () => void;
  user: User;
}

const UserDetailsForm: FC<UserDetailsFormProps> = ({ onClose, user }) => {
  const { data: metersData, isLoading: isLoadingMeters } = useGetUserMeters(
    user.id,
  );
  const [expandedMeters, setExpandedMeters] = useState<Set<string>>(new Set());

  const toggleMeter = (meterId: string) => {
    setExpandedMeters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(meterId)) {
        newSet.delete(meterId);
      } else {
        newSet.add(meterId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: boolean) => {
    return status
      ? { bg: "#E8F5E9", text: "#2E7D32" }
      : { bg: "#FFEBEE", text: "#EA0000" };
  };

  const getMeterStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "registered":
        return { bg: "#E8F5E9", text: "#2E7D32" };
      case "pending":
        return { bg: "#FFF9C4", text: "#F57F17" };
      case "inactive":
        return { bg: "#FFEBEE", text: "#EA0000" };
      default:
        return { bg: "#F5F5F5", text: "#757575" };
    }
  };

  const formatRole = (role: string) => {
    if (!role) return "N/A";
    return role
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const statusColors = getStatusColor(user.isActive);
  const userName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A";

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
          User Details
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          Complete information about this user
        </Typography>
      </Box>

      {/* Content */}
      <Box
        className="no-scrollbar"
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 1,
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
            // mb: 3,
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
            {user.isActive ? "Active" : "Inactive"}
          </Typography>
        </Box>

        {/* Basic Information */}
        <SectionTitle title="Basic Information" />
        <Box>
          <DetailRow label="Name" value={userName} />
          <DetailRow label="Email" value={user.email} />
          <DetailRow
            label="Email Verified"
            value={user.emailVerified ? "Yes" : "No"}
          />
          <DetailRow label="Phone Number" value={user.phoneNumber || "N/A"} />
          <DetailRow label="Username" value={user.username || "N/A"} />
          <DetailRow label="Role" value={formatRole(user.role)} />
          <DetailRow label="Gender" value={user.gender || "N/A"} />
          <DetailRow label="NIN" value={user.nin || "N/A"} />
        </Box>

        {/* Account Information */}
        <SectionTitle title="Account Information" />
        <Box>
          <DetailRow
            label="Ambassador"
            value={user.isAmbassador ? "Yes" : "No"}
          />
          <DetailRow label="Referral Code" value={user.referralCode || "N/A"} />
          <DetailRow label="Referred By" value={user.referredBy || "N/A"} />
          <DetailRow label="Country" value={user.country || "N/A"} />
          <DetailRow
            label="Onboarding Completed"
            value={user.onboardingCompleted ? "Yes" : "No"}
          />
          <DetailRow
            label="Has Linked Meter"
            value={user.hasLinkedMeter ? "Yes" : "No"}
          />
        </Box>

        {/* Location Information */}
        <SectionTitle title="Location Information" />
        <Box>
          <DetailRow label="House Number" value={user.houseNumber || "N/A"} />
          <DetailRow
            label="Onboarding Estate"
            value={user.onboardingEstateName || "N/A"}
          />
        </Box>

        {/* Notification Preferences */}
        <SectionTitle title="Notification Preferences" />
        <Box>
          <DetailRow
            label="Push Notifications"
            value={user.pushNotificationEnabled ? "Enabled" : "Disabled"}
          />
          <DetailRow
            label="Email Notifications"
            value={user.emailNotificationEnabled ? "Enabled" : "Disabled"}
          />
          <DetailRow
            label="Telegram Notifications"
            value={user.telegramNotificationEnabled ? "Enabled" : "Disabled"}
          />
          <DetailRow
            label="Telegram Chat ID"
            value={user.telegramChatId || "Not Linked"}
          />
          <DetailRow
            label="Telegram Linked At"
            value={
              user.telegramLinkedAt ? formatDate(user.telegramLinkedAt) : "N/A"
            }
          />
        </Box>

        {/* Linked Meters */}
        <SectionTitle
          title={`Linked Meters${metersData?.data?.meters ? ` (${metersData.data.meters.length})` : ""}`}
        />
        {isLoadingMeters ? (
          <Box>
            <MeterCardSkeleton />
            <MeterCardSkeleton />
          </Box>
        ) : metersData?.data?.meters && metersData.data.meters.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {metersData.data.meters.map((meter) => {
              const meterStatusColors = getMeterStatusColor(meter.status);
              const isExpanded = expandedMeters.has(meter.id);

              return (
                <Box
                  key={meter.id}
                  sx={{
                    border: "1px solid #E5E5E5",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  {/* Header - Always Visible */}
                  <Box
                    onClick={() => toggleMeter(meter.id)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 2,
                      py: 1,
                      backgroundColor: "#FAFAFA",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#F5F5F5",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#0A0A0A",
                      }}
                    >
                      {meter.meterNumber}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        transform: isExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                        color: "#414141",
                      }}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Box>

                  {/* Collapsible Content */}
                  <Collapse in={isExpanded} timeout={300}>
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "#FFFFFF",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {/* Status Badge */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "14px",
                            color: "#414141",
                          }}
                        >
                          Status
                        </Typography>
                        <Box
                          sx={{
                            display: "inline-flex",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "12px",
                            backgroundColor: meterStatusColors.bg,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 600,
                              color: meterStatusColors.text,
                              textTransform: "capitalize",
                            }}
                          >
                            {meter.status}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Meter Details */}
                      <MeterDetailRow
                        label="Device ID"
                        value={meter.deviceId}
                      />
                      {meter.houseNumber && (
                        <MeterDetailRow
                          label="House Number"
                          value={meter.houseNumber}
                        />
                      )}
                      <MeterDetailRow
                        label="Estate"
                        value={meter.estateName || "N/A"}
                      />
                      <MeterDetailRow
                        label="Valve Status"
                        value={meter.valveStatus ? "Open" : "Closed"}
                      />
                      <MeterDetailRow
                        label="Created At"
                        value={formatDate(meter.createdAt)}
                      />
                    </Box>
                  </Collapse>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box
            sx={{
              p: 3,
              border: "1px dashed #E0E0E0",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "#757575", fontSize: "14px" }}>
              No meters linked to this user
            </Typography>
          </Box>
        )}

        {/* Account Dates */}
        <SectionTitle title="Account Dates" />
        <Box>
          <DetailRow label="Created At" value={formatDate(user.createdAt)} />
          <DetailRow label="Updated At" value={formatDate(user.updatedAt)} />
          {user.emailVerifiedAt && (
            <DetailRow
              label="Email Verified At"
              value={formatDate(user.emailVerifiedAt)}
            />
          )}
          {user.deleteRequestedAt && (
            <DetailRow
              label="Delete Requested At"
              value={formatDate(user.deleteRequestedAt)}
            />
          )}
          {user.deleteEffectiveAt && (
            <DetailRow
              label="Delete Effective At"
              value={formatDate(user.deleteEffectiveAt)}
            />
          )}
        </Box>

        {/* Security Information */}
        <SectionTitle title="Security Information" />
        <Box>
          <DetailRow
            label="Failed Login Attempts"
            value={user.failedLoginAttempts.toString()}
          />
          <DetailRow
            label="Lockout Until"
            value={user.lockoutUntil ? formatDate(user.lockoutUntil) : "N/A"}
          />
          <DetailRow
            label="Is Archived"
            value={user.isArchived ? "Yes" : "No"}
          />
          {user.isArchived && (
            <>
              <DetailRow
                label="Archived At"
                value={user.archivedAt ? formatDate(user.archivedAt) : "N/A"}
              />
              <DetailRow
                label="Archive Reason"
                value={user.archiveReason || "N/A"}
              />
            </>
          )}
        </Box>
      </Box>

      {/* Done Button */}
      <Box
        sx={{
          mt: 4,
          pt: 3,
          borderTop: "1px solid #F5F5F5",
          display: "flex",
          justifyContent: "end",
        }}
      >
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

export default UserDetailsForm;

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
    }}
  >
    <Typography
      sx={{
        fontWeight: 500,
        fontSize: "16px",
        color: "#414141",
        minWidth: "140px",
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "16px",
        color: "#000000",
        textAlign: "right",
        flex: 1,
        wordBreak: "break-word",
        textTransform: "capitalize",
      }}
    >
      {value}
    </Typography>
  </Box>
);

const MeterDetailRow: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography
      sx={{
        fontWeight: 500,
        fontSize: "14px",
        color: "#414141",
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "14px",
        color: "#0A0A0A",
        textAlign: "right",
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

const MeterCardSkeleton: FC = () => (
  <Box
    sx={{
      border: "1px solid #E0E0E0",
      borderRadius: "8px",
      overflow: "hidden",
      mb: 2,
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        backgroundColor: "#FAFAFA",
      }}
    >
      <Skeleton variant="text" width="120px" height={20} />
      <Skeleton variant="circular" width={24} height={24} />
    </Box>
  </Box>
);
