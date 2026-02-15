import { useAuthStore } from "@/store/auth.store";
import { getInitials, getDisplayName, getRole } from "@/utils/auth";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  Button,
  Switch,
  InputBase,
  CircularProgress,
  Alert,
} from "@mui/material";
import { type FC, useState, useEffect, useRef } from "react";
import { useGetSettings, useEditSettings } from "@/hooks/useSettings";
import type { UpdateSettingsPayload } from "@/types/settings.types";
import toast from "react-hot-toast";

const Settings: FC = () => {
  const { user } = useAuthStore();

  // Fetch settings
  const { data: settingsData, isLoading, error } = useGetSettings();

  // Update settings mutation
  const { mutate: updateSettings, isPending: isUpdating } = useEditSettings();

  // Form state
  const [formData, setFormData] = useState<UpdateSettingsPayload>({
    timezone: "",
    currency: "",
    minWalletTopup: "",
    gasPricePerKg: "",
    meterResyncIntervalMinutes: 0,
    autoUnlinkInactiveMeterDays: 0,
    enableAdminAlerts: false,
    notifyAdminType: "",
  });

  // Store original data for comparison
  const [originalData, setOriginalData] = useState<UpdateSettingsPayload>({
    timezone: "",
    currency: "",
    minWalletTopup: "",
    gasPricePerKg: "",
    meterResyncIntervalMinutes: 0,
    autoUnlinkInactiveMeterDays: 0,
    enableAdminAlerts: false,
    notifyAdminType: "",
  });

  // Check if form has changes
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  // Populate form when data is loaded
  useEffect(() => {
    if (settingsData?.data) {
      const newFormData = {
        timezone: settingsData.data.timezone,
        currency: settingsData.data.currency,
        minWalletTopup: settingsData.data.minWalletTopup,
        gasPricePerKg: settingsData.data.gasPricePerKg,
        meterResyncIntervalMinutes:
          settingsData.data.meterResyncIntervalMinutes,
        autoUnlinkInactiveMeterDays:
          settingsData.data.autoUnlinkInactiveMeterDays,
        enableAdminAlerts: settingsData.data.enableAdminAlerts,
        notifyAdminType: settingsData.data.notifyAdminType,
      };
      queueMicrotask(() => {
        setFormData(newFormData);
        setOriginalData(newFormData); // Store original data
      });
    }
  }, [settingsData]);

  const handleSaveChanges = () => {
    if (!hasChanges) {
      return;
    }
    updateSettings(formData, {
      onSuccess: () => {
        setOriginalData(formData);
        toast.success("Settings Saved Successfully");
      },
      onError: (error) => {
        console.error("❌ Failed to update settings:", error);
      },
    });
  };

  const updateFormField = (
    field: keyof UpdateSettingsPayload,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };
      return updated;
    });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress sx={{ color: "#669900" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Failed to load settings. Please try again.
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: "24px", md: "16px" },
          mb: { xs: 2, md: 3 },
        }}
      >
        {/* Title and Subtitle */}
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "24px", md: "32px" },
              lineHeight: "120%",
              color: "#000000",
              mb: "8px",
            }}
          >
            Settings
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Get answers and support for your gas account
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: "8px",
          padding: { xs: "20px 12px", md: "32px 24px" },
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            sx={{
              width: { md: "40px", lg: "47px" },
              height: { md: "40px", lg: "47px" },
              backgroundColor: "#3266CC",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            {getInitials(user)}
          </Avatar>

          {/* User Info */}
          <Stack spacing="4px">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#000000",
              }}
            >
              {getDisplayName(user)}
            </Typography>
            {/* Role Badge */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "32px",
                padding: "6px 16px",
                backgroundColor: "#6699001A",
                width: "fit-content",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#669900",
                }}
              >
                {getRole(user)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Settings Cards Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
          gap: "24px",
          mt: 3,
        }}
      >
        {/* General Card */}
        <Box
          sx={{
            borderRadius: "8px",
            padding: { xs: "16px 12px", md: "18px 24px" },
            backgroundColor: "white",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "4px",
              }}
            >
              General
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#424242",
                mt: "12px",
              }}
            >
              Manage your general settings
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <SettingsInput
              label="Time Zone"
              placeholder="Select time zone"
              value={formData.timezone}
              onChange={(value) => updateFormField("timezone", value)}
            />
            <SettingsInput
              label="Currency"
              placeholder="Select currency"
              value={formData.currency}
              onChange={(value) => updateFormField("currency", value)}
            />
          </Box>
        </Box>

        {/* Payment Settings Card */}
        <Box
          sx={{
            borderRadius: "8px",
            padding: { xs: "16px 12px", md: "18px 24px" },
            backgroundColor: "white",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "4px",
              }}
            >
              Payment Settings
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#424242",
                mt: "12px",
              }}
            >
              Configure payment preferences
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <SettingsInput
              label="Minimum Wallet Top Up"
              placeholder="Enter minimum amount"
              value={formData.minWalletTopup}
              type="number"
              onChange={(value) => updateFormField("minWalletTopup", value)}
            />
            <SettingsInput
              label="Price Per KG"
              placeholder="Enter price per kg"
              value={formData.gasPricePerKg}
              type="number"
              onChange={(value) => updateFormField("gasPricePerKg", value)}
            />
          </Box>
        </Box>

        {/* Meter Settings Card */}
        <Box
          sx={{
            borderRadius: "8px",
            padding: { xs: "16px 12px", md: "18px 24px" },
            backgroundColor: "white",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "4px",
              }}
            >
              Meter Settings
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#424242",
                mt: "12px",
              }}
            >
              Manage meter configurations
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <SettingsInput
              label="Meter Resync Interval"
              placeholder="Enter interval in minutes"
              value={String(formData.meterResyncIntervalMinutes)}
              type="number"
              onChange={(value) =>
                updateFormField("meterResyncIntervalMinutes", Number(value))
              }
            />
            <SettingsInput
              label="Auto Unlink Inactive Meter"
              placeholder="Enter days"
              value={String(formData.autoUnlinkInactiveMeterDays)}
              type="number"
              onChange={(value) =>
                updateFormField("autoUnlinkInactiveMeterDays", Number(value))
              }
            />
          </Box>
        </Box>

        {/* Notifications Card */}
        <Box
          sx={{
            borderRadius: "8px",
            padding: { xs: "16px 12px", md: "18px 24px" },
            backgroundColor: "white",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "4px",
              }}
            >
              Notifications
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#424242",
                mt: "12px",
              }}
            >
              Control notification preferences
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Alerts Toggle */}
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="label"
                sx={{
                  fontFamily: "Geist",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#000000",
                  mb: "8px",
                  display: "block",
                }}
              >
                Alerts
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: "8px",
                  py: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                  }}
                >
                  Enable alerts to admin
                </Typography>
                <Switch
                  checked={formData.enableAdminAlerts}
                  onChange={(e) => {
                    updateFormField("enableAdminAlerts", e.target.checked);
                  }}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#669900",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#669900",
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Notify Admins Input */}
            {/* <Box sx={{ minWidth: 0 }}>
              <SettingsInput
                label="Notify Admins"
                placeholder="Select Admin"
                value={formData.notifyAdminType}
                type="text"
                onChange={(value) => updateFormField("notifyAdminType", value)}
              />
            </Box> */}
          </Box>
        </Box>
      </Box>

      {/* Save Changes Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
        <Button
          onClick={handleSaveChanges}
          disabled={!hasChanges || isUpdating}
          sx={{
            height: "48px",
            borderRadius: "32px",
            padding: "12px 24px",
            backgroundColor: "#669900",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: { xs: "14px", sm: "16px" },
            lineHeight: "100%",
            letterSpacing: "0%",
            textTransform: "capitalize",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "#558000",
            },
            "&:disabled": {
              backgroundColor: "#CCCCCC",
              color: "#666666",
            },
          }}
        >
          {isUpdating ? (
            <>
              <CircularProgress size={16} sx={{ color: "#FFFFFF" }} />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Box>
    </>
  );
};

export default Settings;

interface SettingsInputProps {
  label: string;
  placeholder: string;
  value?: string;
  type?: "text" | "email" | "tel" | "number";
  onChange?: (value: string) => void;
}

const SettingsInput: FC<SettingsInputProps> = ({
  label,
  placeholder,
  value = "",
  type = "text",
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input value with prop when not editing
  if (!isEditing && inputValue !== value) {
    setInputValue(value);
  }

  const handleEdit = () => {
    setIsEditing(true);
    // Focus the input after state update
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onChange && inputValue !== value) {
      onChange(inputValue);
    } else return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        component="label"
        sx={{
          fontFamily: "Geist",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "100%",
          letterSpacing: "0%",
          textTransform: "capitalize",
          color: "#000000",
          mb: "8px",
          display: "block",
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderRadius: "8px",
          border: isEditing ? "2px solid #669900" : "1px solid #EAEAEA",
          paddingTop: { xs: "12px", md: "18px" },
          paddingRight: { xs: "16px", md: "24px" },
          paddingBottom: { xs: "12px", md: "18px" },
          paddingLeft: { xs: "16px", md: "24px" },
          transition: "border 0.2s ease-in-out",
        }}
      >
        <InputBase
          inputRef={inputRef}
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          readOnly={!isEditing}
          sx={{
            flex: 1,
            minWidth: 0,
            fontWeight: isEditing ? 600 : 400,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#000000",
            transition: "font-weight 0.2s ease-in-out",
            "& input": {
              padding: 0,
              cursor: isEditing ? "text" : "default",
              "&::placeholder": {
                color: "#808080",
                opacity: 1,
              },
            },
          }}
        />
        <Typography
          onClick={isEditing ? handleSave : handleEdit}
          sx={{
            fontFamily: "Geist",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textTransform: "capitalize",
            color: "#669900",
            cursor: "pointer",
            flexShrink: 0,
            userSelect: "none",
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Typography>
      </Box>
    </Box>
  );
};
