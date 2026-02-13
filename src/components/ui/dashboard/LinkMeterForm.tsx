import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { type FC, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import UserSelect from "./UserSelect";
import type { User } from "@/types/users.types";
import { useLinkMeter } from "@/hooks/useMeters";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import CheckIcon from "@/assets/icons/check.svg";
import SuccessIcon from "@/assets/success.svg";
import {
  linkMeterSchema,
  type LinkMeterFormData,
} from "@/schemas/linkMeterSchema";

interface LinkMeterFormProps {
  onClose: () => void;
  open?: boolean;
}

const LinkMeterForm: FC<LinkMeterFormProps> = ({ onClose, open = true }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [apiError, setApiError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: linkMeter, isPending } = useLinkMeter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LinkMeterFormData>({
    resolver: zodResolver(linkMeterSchema),
    defaultValues: {
      meterNumber: "",
      userId: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const meterNumber = watch("meterNumber");

  // Reset form when drawer opens/closes
  useEffect(() => {
    if (open) {
      // Reset everything when drawer opens
      reset();
      setSelectedUser(null);
      setApiError("");
      setShowSuccess(false);
    }
  }, [open, reset]);

  const handleUserChange = (user: User | null) => {
    setSelectedUser(user);
    setValue("userId", user?.id || "", { shouldValidate: true });
    setApiError("");
  };

  const onSubmit = (data: LinkMeterFormData) => {
    if (!selectedUser) return;

    // Validate user has required info
    if (!selectedUser.estateId) {
      setApiError("Selected user must have estate information");
      return;
    }

    if (!selectedUser.houseNumber) {
      setApiError("Selected user must have a house number");
      return;
    }

    const params = {
      meterNumber: data.meterNumber,
      userId: selectedUser.id,
      estateId: selectedUser.estateId,
      houseNumber: selectedUser.houseNumber,
      ...(selectedUser.estateId === "OTHER" &&
        selectedUser.onboardingEstateName && {
          estateName: selectedUser.onboardingEstateName,
        }),
    };

    linkMeter(params, {
      onSuccess: () => {
        setShowSuccess(true);
        // Auto close after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to link meter. Please try again.";
        setApiError(errorMessage);
      },
    });
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
          }}
        >
          Linking Successful
        </Typography>
      </Box>
    );
  }

  // Check if meter number is valid
  const isValidMeterNumber =
    meterNumber &&
    /^\d{3}-\d{3}-\d{3}$/.test(meterNumber) &&
    !errors.meterNumber;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
          Link a Meter
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          Connect a meter to a registered user
        </Typography>
      </Box>

      {/* Form Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        {/* API Error Message */}
        {apiError && (
          <Box
            sx={{
              p: 2,
              borderRadius: "8px",
              backgroundColor: "#FFEBEE",
              border: "1px solid #FFCDD2",
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

        {/* Meter Number Input */}
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#000000",
              mb: "8px",
            }}
          >
            Meter Number
          </Typography>
          <Controller
            name="meterNumber"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <PatternFormat
                format="###-###-###"
                mask="_"
                customInput={TextField}
                fullWidth
                placeholder="XXX-XXX-XXX"
                value={value}
                onValueChange={(values) => {
                  onChange(values.formattedValue);
                  setApiError("");
                }}
                onBlur={onBlur}
                error={!!errors.meterNumber}
                helperText={errors.meterNumber?.message}
                InputProps={{
                  endAdornment: isValidMeterNumber && (
                    <Box component="img" src={CheckIcon} alt="check" />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "56px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: errors.meterNumber ? "#D32F2F" : "#E0E0E0",
                      borderWidth: "1.5px",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.meterNumber ? "#D32F2F" : "#669900",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.meterNumber ? "#D32F2F" : "#669900",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: "16px",
                    fontSize: "12px",
                  },
                }}
              />
            )}
          />
        </Box>

        {/* User Select */}
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#000000",
              mb: "8px",
            }}
          >
            Select User
          </Typography>
          <UserSelect
            value={selectedUser}
            onChange={handleUserChange}
            error={errors.userId?.message}
          />
        </Box>
      </Box>

      {/* Submit Button */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          disabled={isPending}
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
          {isPending ? (
            <>
              Link
              <CircularProgress
                size={20}
                sx={{
                  color: "#FFFFFF",
                }}
              />
            </>
          ) : (
            <>
              Link
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
    </Box>
  );
};

export default LinkMeterForm;
