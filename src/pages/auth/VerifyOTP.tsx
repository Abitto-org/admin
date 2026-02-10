import { Box, Typography, TextField, Button, InputLabel } from "@mui/material";
import {
  useState,
  useEffect,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtp, useResendOtp, getTempOtp } from "@/hooks/useAuth";

const OTP_LENGTH = 6;
const TIMER_DURATION = 90;

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [isExpired, setIsExpired] = useState(false);
  const [isAutoVerifying, setIsAutoVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { verifyOtp, isLoading, error } = useVerifyOtp();
  const {
    resendOtp,
    isLoading: isResending,
    error: resendError,
  } = useResendOtp();

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate("/auth/login");
    }
  }, [email, navigate]);
  const handleVerifyOtp = async (otpDigits: string[] = otp) => {
    if (!email || isExpired) return;

    const otpString = otpDigits.join("");
    if (otpString.length !== OTP_LENGTH) return;

    await verifyOtp({
      email,
      otp: otpString,
      type: "login_device_verification",
    });
  };

  // Auto-fill OTP in development
  useEffect(() => {
    const tempData = getTempOtp();
    if (tempData && tempData.email === email) {
      const otpDigits = tempData.otp.split("");
      setTimeout(() => {
        setOtp(otpDigits);
        setIsAutoVerifying(true);
        // Auto-submit after a brief delay
        setTimeout(() => {
          handleVerifyOtp(otpDigits);
        }, 500);
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !isExpired) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, isExpired]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (newOtp.every((digit) => digit !== "") && !isExpired) {
      handleVerifyOtp(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Only process if it's a valid OTP (6 digits)
    if (/^\d{6}$/.test(pastedData)) {
      const otpDigits = pastedData.split("");
      setOtp(otpDigits);

      // Focus last input
      inputRefs.current[OTP_LENGTH - 1]?.focus();

      // Auto-submit
      if (!isExpired) {
        handleVerifyOtp(otpDigits);
      }
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;

    const newOtp = await resendOtp(email);
    if (newOtp) {
      // Reset timer and expired state
      setTimer(TIMER_DURATION);
      setIsExpired(false);
      setOtp(new Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerifyOtp();
  };

  return (
    <Box maxWidth="400px" width="100%" component="form" onSubmit={handleSubmit}>
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
        Verify OTP
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
        Enter the 6-digit code sent to {email}
      </Typography>

      {/* Timer */}
      <Box mb={3} display="flex" alignItems="center" gap={1}>
        <Typography
          fontSize="14px"
          fontWeight={500}
          color={
            isExpired
              ? "#d32f2f"
              : isAutoVerifying || isLoading
                ? "#1976d2"
                : "#000000"
          }
        >
          {isAutoVerifying || isLoading
            ? "Verifying..."
            : isExpired
              ? "OTP Expired"
              : `Time remaining: ${formatTime(timer)}`}
        </Typography>
      </Box>

      {/* OTP Input */}
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
          OTP Code
        </InputLabel>
        <Box display="flex" gap={1} mb={1}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onKeyDown={(e) => handleKeyDown(index, e as any)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isExpired || isLoading || isAutoVerifying}
              error={!!error}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center" },
              }}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": {
                    border: "1px solid #EDEDED",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #EDEDED",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #000000",
                  },
                  "&.Mui-error fieldset": {
                    border: "1px solid #d32f2f",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#f5f5f5",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: "16px 8px",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#000000",
                },
              }}
            />
          ))}
        </Box>

        {/* Error Message */}
        {error && (
          <Typography fontSize="11px" color="#d32f2f" mt={1}>
            {error}
          </Typography>
        )}

        {/* Resend Error Message */}
        {resendError && (
          <Typography fontSize="11px" color="#d32f2f" mt={1}>
            {resendError}
          </Typography>
        )}
      </Box>

      {/* Resend OTP */}
      <Box mb={3} display="flex" justifyContent="center">
        <Button
          variant="text"
          onClick={handleResendOtp}
          disabled={!isExpired || isResending}
          sx={{
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 500,
            color: isExpired ? "#000000" : "#AAAAAA",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
            "&.Mui-disabled": {
              color: "#AAAAAA",
            },
          }}
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </Button>
      </Box>

      {/* Verify Button */}
      <Box display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          disabled={
            isExpired ||
            isLoading ||
            isAutoVerifying ||
            otp.some((digit) => !digit)
          }
        >
          {isLoading || isAutoVerifying ? "Verifying..." : "Verify"}
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyOtp;
