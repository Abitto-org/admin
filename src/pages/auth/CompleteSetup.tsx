import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCompleteSetup } from "@/hooks/useAdmins";
import SuccessIcon from "@/assets/success.svg";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/\d/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SetupFormData = z.infer<typeof schema>;

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": { border: "1px solid #EDEDED" },
    "&:hover fieldset": { border: "1px solid #EDEDED" },
    "&.Mui-focused fieldset": { border: "1px solid #669900" },
    "&.Mui-error fieldset": { border: "1px solid #d32f2f" },
  },
  "& .MuiOutlinedInput-input": {
    padding: "16px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#000000",
    "&::placeholder": {
      fontSize: "14px",
      fontWeight: 500,
      color: "#AAAAAA",
      opacity: 1,
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    marginTop: "4px",
    fontSize: "11px",
  },
};

const CompleteSetup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const { mutate: completeSetup, isPending } = useCompleteSetup();

  // If no token present, redirect to login
  useEffect(() => {
    if (!token) {
      navigate("/auth/login", { replace: true });
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupFormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: SetupFormData) => {
    setApiError("");
    completeSetup(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        token,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setTimeout(() => navigate("/auth/login"), 2500);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Setup failed. The link may have expired.";
          setApiError(message);
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
          minHeight: "100vh",
          p: 4,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Box component="img" src={SuccessIcon} alt="Success" sx={{ mb: 3 }} />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "24px",
            color: "#000000",
            textAlign: "center",
            mb: 1,
          }}
        >
          Account Setup Complete
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            color: "#414141",
            textAlign: "center",
          }}
        >
          Redirecting you to login...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      maxWidth="400px"
      width="100%"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Heading */}
      <Typography
        fontSize={{ xs: "24px", md: "32px" }}
        fontWeight={700}
        lineHeight="100%"
        letterSpacing="-0.02em"
        mb={1}
        color="#000000"
      >
        Complete Setup
      </Typography>

      <Typography
        fontSize={{ xs: "12px", md: "14px" }}
        fontWeight={500}
        lineHeight="140%"
        letterSpacing="-0.02em"
        mb={3}
        color="text.primary"
      >
        You've been invited to join as an admin. Set up your account below.
      </Typography>

      {/* API Error */}
      {apiError && (
        <Box
          mb={2}
          p={2}
          bgcolor="#fdecea"
          borderRadius="8px"
          border="1px solid #f5c6cb"
        >
          <Typography fontSize="12px" color="#d32f2f">
            {apiError}
          </Typography>
        </Box>
      )}

      {/* First Name */}
      <Box mb={2}>
        <InputLabel
          sx={{
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "100%",
            color: "#000000",
            mb: 1,
          }}
        >
          First Name
        </InputLabel>
        <TextField
          fullWidth
          placeholder="Enter first name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          disabled={isPending}
          sx={inputSx}
        />
      </Box>

      {/* Last Name */}
      <Box mb={2}>
        <InputLabel
          sx={{
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "100%",
            color: "#000000",
            mb: 1,
          }}
        >
          Last Name
        </InputLabel>
        <TextField
          fullWidth
          placeholder="Enter last name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          disabled={isPending}
          sx={inputSx}
        />
      </Box>

      {/* Password */}
      <Box mb={2}>
        <InputLabel
          sx={{
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "100%",
            color: "#000000",
            mb: 1,
          }}
        >
          Password
        </InputLabel>
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Create a strong password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isPending}
          sx={inputSx}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={isPending}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Confirm Password */}
      <Box mb={3}>
        <InputLabel
          sx={{
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "100%",
            color: "#000000",
            mb: 1,
          }}
        >
          Confirm Password
        </InputLabel>
        <TextField
          fullWidth
          type={showConfirm ? "text" : "password"}
          placeholder="Re-enter your password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          disabled={isPending}
          sx={inputSx}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirm(!showConfirm)}
                    edge="end"
                    disabled={isPending}
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Submit */}
      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              Setting up&nbsp;
              <CircularProgress size={16} sx={{ color: "inherit" }} />
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default CompleteSetup;
