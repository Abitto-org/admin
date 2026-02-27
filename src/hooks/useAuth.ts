import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import type { LoginRequest, VerifyOtpRequest } from '@/types/api.types';

const OTP_STORAGE_KEY = 'ABITTO_TEMP_OTP';
const EMAIL_STORAGE_KEY = 'ABITTO_TEMP_EMAIL';

// Helper to store OTP temporarily in development
const storeTempOtp = (email: string, otp: string) => {
  //if (import.meta.env.DEV) {
  localStorage.setItem(OTP_STORAGE_KEY, otp);
  localStorage.setItem(EMAIL_STORAGE_KEY, email);
  // }
};

// Helper to get and clear temp OTP
export const getTempOtp = (): { email: string; otp: string } | null => {
  if (import.meta.env.DEV) {
    const otp = localStorage.getItem(OTP_STORAGE_KEY);
    const email = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (otp && email) {
      return { email, otp };
    }
  }
  return null;
};

export const clearTempOtp = () => {
  localStorage.removeItem(OTP_STORAGE_KEY);
  localStorage.removeItem(EMAIL_STORAGE_KEY);
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(data);

      if (response.status === 'success') {
        // Store OTP temporarily in development
        storeTempOtp(data.email, response.data.otp);

        // Navigate to verify OTP page
        navigate('/auth/verify-otp', {
          state: { email: data.email },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export const useVerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setToken, fetchUser } = useAuthStore();

  const verifyOtp = async (data: VerifyOtpRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.verifyOtp(data);

      if (response.status === 'success' && response.data.validated) {
        // Save access token
        setToken(response.data.token);

        // Fetch user profile
        await fetchUser();

        // Clear temporary OTP data
        clearTempOtp();

        // Navigate to dashboard
        navigate('/dashboard');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        'OTP verification failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { verifyOtp, isLoading, error };
};

export const useResendOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resendOtp = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.resendOtp({
        email,
        otp: '555555', // Placeholder as per API requirements
        type: 'login_device_verification',
      });

      if (response.status === 'success') {
        // Store new OTP temporarily in development
        storeTempOtp(email, response.data.otp);
        return response.data.otp;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        'Failed to resend OTP. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { resendOtp, isLoading, error };
};
