import { http } from "./index";
import type {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
} from "@/types/api.types.ts";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await http.post<LoginResponse>("/auth/signin", data);
    return response.data;
  },
  verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const response = await http.post<VerifyOtpResponse>("/otp/verify", data);
    return response.data;
  },
  resendOtp: async (data: ResendOtpRequest): Promise<LoginResponse> => {
    const response = await http.post<LoginResponse>("/otp/generate", data);
    return response.data;
  },
};
