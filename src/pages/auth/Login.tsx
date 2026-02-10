import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error: loginError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

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
        textAlign="left"
        mb={2}
        color="#000000"
      >
        Log In
      </Typography>

      {/* Subtitle */}
      <Typography
        fontSize={{ xs: "12px", md: "14px" }}
        fontWeight={500}
        lineHeight="100%"
        letterSpacing="-0.02em"
        mb={3}
        color="text.primary"
      >
        Sign in to manage the system and operations.
      </Typography>

      {/* Login Error */}
      {loginError && (
        <Box
          mb={2}
          p={2}
          bgcolor="#fdecea"
          borderRadius="8px"
          border="1px solid #f5c6cb"
        >
          <Typography fontSize="12px" color="#d32f2f">
            {loginError}
          </Typography>
        </Box>
      )}

      {/* Email Input */}
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
          Email
        </InputLabel>
        <TextField
          fullWidth
          type="email"
          placeholder="Enter Email Address"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isLoading}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                border: "1px solid #EDEDED",
              },
              "&:hover fieldset": {
                border: "1px solid #EDEDED",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #EDEDED",
              },
              "&.Mui-error fieldset": {
                border: "1px solid #d32f2f",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "16px",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#000000",
              "&::placeholder": {
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#AAAAAA",
                opacity: 1,
              },
            },
            "& .MuiFormHelperText-root": {
              marginLeft: 0,
              marginTop: "4px",
              fontSize: "11px",
            },
          }}
        />
      </Box>

      {/* Password Input */}
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
          Password
        </InputLabel>
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isLoading}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                border: "1px solid #EDEDED",
              },
              "&:hover fieldset": {
                border: "1px solid #EDEDED",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #EDEDED",
              },
              "&.Mui-error fieldset": {
                border: "1px solid #d32f2f",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "16px",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#000000",
              "&::placeholder": {
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#AAAAAA",
                opacity: 1,
              },
            },
            "& .MuiFormHelperText-root": {
              marginLeft: 0,
              marginTop: "4px",
              fontSize: "11px",
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={isLoading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Login Button */}
      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
