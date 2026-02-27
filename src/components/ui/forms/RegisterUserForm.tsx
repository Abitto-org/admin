import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { type FC, useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import {
  registerUserStep1Schema,
  registerUserStep2Schema,
  registerUserStep3Schema,
  type RegisterUserStep1Data,
  type RegisterUserStep2Data,
  type RegisterUserStep3Data,
} from "@/schemas/registerUserSchema";
import { useRegisterUser } from "@/hooks/useUsers";
import { useGetEstates } from "@/hooks/useEstates";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import SuccessIcon from "@/assets/success.svg";
import EstateSelect from "@/components/ui/dashboard/EstateSelect";
import type { Estate } from "@/types/estates.types";

interface StoredFormState {
  step: number;
  step1: Partial<RegisterUserStep1Data>;
  step2: Partial<RegisterUserStep2Data>;
  step3: Partial<RegisterUserStep3Data>;
  selectedEstate: Estate | null;
}

const defaultState: StoredFormState = {
  step: 1,
  step1: {},
  step2: {},
  step3: {},
  selectedEstate: null,
};

let persistedState: StoredFormState = { ...defaultState };

interface RegisterUserFormProps {
  onClose: () => void;
  open?: boolean;
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    height: "56px",
    fontSize: "16px",
    borderRadius: "8px",
    "& fieldset": { borderColor: "#E0E0E0", borderWidth: "1.5px" },
    "&:hover fieldset": { borderColor: "#669900" },
    "&.Mui-focused fieldset": { borderColor: "#669900" },
  },
  "& .MuiFormHelperText-root": { marginLeft: "16px", fontSize: "12px" },
};

const RegisterUserForm: FC<RegisterUserFormProps> = ({ onClose }) => {
  const [step, setStep] = useState(persistedState.step);
  const [step1Data, setStep1Data] = useState<Partial<RegisterUserStep1Data>>(
    persistedState.step1,
  );
  const [step2Data, setStep2Data] = useState<Partial<RegisterUserStep2Data>>(
    persistedState.step2,
  );
  const [apiError, setApiError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const estateSearch = step === 2 ? step2Data.estateName || "" : "";
  // Init from persisted
  const [selectedEstate, setSelectedEstate] = useState<Estate | null>(
    persistedState.selectedEstate,
  );
  // Update the sync effect
  useEffect(() => {
    persistedState = {
      step,
      step1: step1Data,
      step2: step2Data,
      step3: {},
      selectedEstate,
    };
  }, [step, step1Data, step2Data, selectedEstate]);

  const { mutate: registerUser, isPending } = useRegisterUser();

  const estateQueryParams = useMemo(
    () => ({
      page: 1,
      limit: 20,
      ...(estateSearch && { search: estateSearch }),
    }),
    [estateSearch],
  );
  const { data: estatesData } = useGetEstates(estateQueryParams);
  const estates = estatesData?.data?.estates ?? [];

  // Sync persisted state when step/data changes
  useEffect(() => {
    persistedState = {
      step,
      step1: step1Data,
      step2: step2Data,
      step3: {},
      selectedEstate,
    };
  }, [selectedEstate, step, step1Data, step2Data]);

  // Step 1 form
  const step1Form = useForm<RegisterUserStep1Data>({
    resolver: zodResolver(registerUserStep1Schema),
    defaultValues: {
      firstName: persistedState.step1.firstName ?? "",
      lastName: persistedState.step1.lastName ?? "",
      gender: persistedState.step1.gender,
      phoneNumber: persistedState.step1.phoneNumber ?? "",
    },
  });

  // Step 2 form
  const step2Form = useForm<RegisterUserStep2Data>({
    resolver: zodResolver(registerUserStep2Schema),
    defaultValues: {
      estateId: persistedState.step2.estateId ?? "",
      estateName: persistedState.step2.estateName ?? "",
      houseNumber: persistedState.step2.houseNumber ?? "",
      nin: persistedState.step2.nin ?? "",
      meterNumber: persistedState.step2.meterNumber ?? "",
    },
  });

  // Step 3 form
  const step3Form = useForm<RegisterUserStep3Data>({
    resolver: zodResolver(registerUserStep3Schema),
    defaultValues: { user_email: "" },
  });

  const handleStep1Submit = (data: RegisterUserStep1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleStep2Submit = (data: RegisterUserStep2Data) => {
    setStep2Data(data);
    setStep(3);
  };

  const handleStep3Submit = (data: RegisterUserStep3Data) => {
    setApiError("");

    const selectedEstate = estates.find((e) => e.id === step2Data.estateId);

    const params = {
      firstName: step1Data.firstName!,
      lastName: step1Data.lastName!,
      gender: step1Data.gender!,
      phoneNumber: step1Data.phoneNumber!,
      estateId: step2Data.estateId!,
      ...(selectedEstate && { estateName: selectedEstate.name }),
      houseNumber: step2Data.houseNumber!,
      nin: step2Data.nin!,
      user_email: data.user_email,
      ...(step2Data.meterNumber && { meterNumber: step2Data.meterNumber }),
    };

    registerUser(params, {
      onSuccess: () => {
        // Clear persisted state on success
        persistedState = { ...defaultState };
        setShowSuccess(true);
        setTimeout(() => onClose(), 2000);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to register user. Please try again.";
        setApiError(message);
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
        <Box component="img" src={SuccessIcon} alt="Success" sx={{ mb: 2 }} />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#000000",
            textAlign: "center",
          }}
        >
          User Registered Successfully
        </Typography>
      </Box>
    );
  }

  const stepTitles = ["Personal Details", "Estate & Identity", "Email Address"];
  const stepSubtitles = [
    "Enter the user's basic information",
    "Link the user to an estate",
    "Provide the user's email address",
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
          Register New User
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          {stepSubtitles[step - 1]}
        </Typography>

        {/* Step Indicator */}
        <Box sx={{ display: "flex", gap: "8px", mt: "16px" }}>
          {[1, 2, 3].map((s) => (
            <Box
              key={s}
              sx={{
                height: "4px",
                flex: 1,
                borderRadius: "2px",
                backgroundColor: s <= step ? "#669900" : "#E0E0E0",
                transition: "background-color 0.2s",
              }}
            />
          ))}
        </Box>
        <Typography sx={{ fontSize: "12px", color: "#414141", mt: "8px" }}>
          Step {step} of 3 — {stepTitles[step - 1]}
        </Typography>
      </Box>

      {/* API Error */}
      {apiError && (
        <Box
          sx={{
            p: 2,
            borderRadius: "8px",
            backgroundColor: "#FFEBEE",
            border: "1px solid #FFCDD2",
            mb: 2,
          }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "#C62828", fontWeight: 500 }}
          >
            {apiError}
          </Typography>
        </Box>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <Box
          component="form"
          onSubmit={step1Form.handleSubmit(handleStep1Submit)}
          sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 3 }}
        >
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}
          >
            {/* First Name */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  mb: "8px",
                }}
              >
                First Name
              </Typography>
              <Controller
                name="firstName"
                control={step1Form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter first name"
                    error={!!step1Form.formState.errors.firstName}
                    helperText={step1Form.formState.errors.firstName?.message}
                    sx={inputSx}
                  />
                )}
              />
            </Box>

            {/* Last Name */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  mb: "8px",
                }}
              >
                Last Name
              </Typography>
              <Controller
                name="lastName"
                control={step1Form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter last name"
                    error={!!step1Form.formState.errors.lastName}
                    helperText={step1Form.formState.errors.lastName?.message}
                    sx={inputSx}
                  />
                )}
              />
            </Box>

            {/* Gender */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  mb: "8px",
                }}
              >
                Gender
              </Typography>
              <Controller
                name="gender"
                control={step1Form.control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!step1Form.formState.errors.gender}
                  >
                    <Select
                      {...field}
                      displayEmpty
                      sx={{
                        height: "56px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E0E0E0",
                          borderWidth: "1.5px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#669900",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#669900",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <span style={{ color: "#9E9E9E" }}>Select gender</span>
                      </MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                    {step1Form.formState.errors.gender && (
                      <FormHelperText sx={{ ml: "16px", fontSize: "12px" }}>
                        {step1Form.formState.errors.gender.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>

            {/* Phone Number */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  mb: "8px",
                }}
              >
                Phone Number
              </Typography>
              <Controller
                name="phoneNumber"
                control={step1Form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="08012345678"
                    inputProps={{ maxLength: 11 }}
                    error={!!step1Form.formState.errors.phoneNumber}
                    helperText={step1Form.formState.errors.phoneNumber?.message}
                    sx={inputSx}
                  />
                )}
              />
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
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
                gap: "12px",
                "&:hover": { backgroundColor: "#558000" },
              }}
            >
              Proceed
              <Box
                component="img"
                src={ButtonArrowIcon}
                alt="arrow"
                sx={{ width: "20px", height: "20px" }}
              />
            </Button>
          </Box>
        </Box>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <Box
          component="form"
          onSubmit={step2Form.handleSubmit(handleStep2Submit)}
          sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 3 }}
        >
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}
          >
            {/* Estate */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  mb: "8px",
                }}
              >
                Estate
              </Typography>
              <EstateSelect
                value={selectedEstate}
                onChange={(estate) => {
                  setSelectedEstate(estate);
                  step2Form.setValue("estateId", estate?.id ?? "", {
                    shouldValidate: true,
                  });
                }}
                error={step2Form.formState.errors.estateId?.message}
              />
            </Box>

            {/* House Number */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  mb: "8px",
                }}
              >
                House Number
              </Typography>
              <Controller
                name="houseNumber"
                control={step2Form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="e.g. Block A, Room 5"
                    error={!!step2Form.formState.errors.houseNumber}
                    helperText={step2Form.formState.errors.houseNumber?.message}
                    sx={inputSx}
                  />
                )}
              />
            </Box>

            {/* NIN */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  mb: "8px",
                }}
              >
                NIN
              </Typography>
              <Controller
                name="nin"
                control={step2Form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="11-digit NIN"
                    inputProps={{ maxLength: 11 }}
                    error={!!step2Form.formState.errors.nin}
                    helperText={step2Form.formState.errors.nin?.message}
                    sx={inputSx}
                  />
                )}
              />
            </Box>

            {/* Meter Number (optional) */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  mb: "8px",
                }}
              >
                Meter Number{" "}
                <span style={{ color: "#9E9E9E", fontWeight: 400 }}>
                  (optional)
                </span>
              </Typography>
              <Controller
                name="meterNumber"
                control={step2Form.control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <PatternFormat
                    format="###-###-###"
                    mask="_"
                    customInput={TextField}
                    fullWidth
                    placeholder="XXX-XXX-XXX"
                    value={value}
                    onValueChange={(values) => onChange(values.formattedValue)}
                    onBlur={onBlur}
                    error={!!step2Form.formState.errors.meterNumber}
                    helperText={step2Form.formState.errors.meterNumber?.message}
                    sx={inputSx}
                  />
                )}
              />
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button
              type="button"
              onClick={() => setStep(1)}
              sx={{
                height: "48px",
                borderRadius: "32px",
                padding: "12px 24px",
                backgroundColor: "#FFFFFF",
                color: "#669900",
                fontWeight: 600,
                fontSize: "16px",
                textTransform: "capitalize",
                border: "1.5px solid #669900",
                "&:hover": { backgroundColor: "#F5F5F5" },
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
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
                gap: "12px",
                "&:hover": { backgroundColor: "#558000" },
              }}
            >
              Proceed
              <Box
                component="img"
                src={ButtonArrowIcon}
                alt="arrow"
                sx={{ width: "20px", height: "20px" }}
              />
            </Button>
          </Box>
        </Box>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <Box
          component="form"
          onSubmit={step3Form.handleSubmit(handleStep3Submit)}
          sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 3 }}
        >
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  mb: "8px",
                }}
              >
                Email Address
              </Typography>
              <Controller
                name="user_email"
                control={step3Form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="example@email.com"
                    type="email"
                    error={!!step3Form.formState.errors.user_email}
                    helperText={step3Form.formState.errors.user_email?.message}
                    sx={inputSx}
                  />
                )}
              />
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button
              type="button"
              onClick={() => setStep(2)}
              sx={{
                height: "48px",
                borderRadius: "32px",
                padding: "12px 24px",
                backgroundColor: "#FFFFFF",
                color: "#669900",
                fontWeight: 600,
                fontSize: "16px",
                textTransform: "capitalize",
                border: "1.5px solid #669900",
                "&:hover": { backgroundColor: "#F5F5F5" },
              }}
            >
              Back
            </Button>
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
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                "&:hover": { backgroundColor: "#558000" },
                "&:disabled": { backgroundColor: "#BDBDBD", color: "#FFFFFF" },
              }}
            >
              {isPending ? (
                <>
                  Register{" "}
                  <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
                </>
              ) : (
                <>
                  Register
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
      )}
    </Box>
  );
};

export default RegisterUserForm;
