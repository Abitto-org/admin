// Base API Response
export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message: string;
  data: T;
}

// Login Response
export interface LoginResponseData {
  otp: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

// Verify OTP Response
export interface VerifyOtpResponseData {
  type: string;
  validated: boolean;
  token: string;
  onboardingCompleted: boolean;
}

export type VerifyOtpResponse = ApiResponse<VerifyOtpResponseData>;

// Login Request
export interface LoginRequest {
  email: string;
  password: string;
}

// Verify OTP Request
export interface VerifyOtpRequest {
  email: string;
  otp: string;
  type: "login_device_verification";
}

// Resend OTP Request
export interface ResendOtpRequest {
  email: string;
  otp: string;
  type: "login_device_verification";
}
