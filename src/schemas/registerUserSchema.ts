import { z } from "zod";

export const registerUserStep1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  phoneNumber: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

export const registerUserStep2Schema = z.object({
  estateId: z.string().min(1, "Estate is required"),
  estateName: z.string().optional(),
  houseNumber: z.string().min(1, "House number is required"),
  nin: z
    .string()
    .min(11, "NIN must be 11 digits")
    .max(11, "NIN must be 11 digits")
    .regex(/^\d+$/, "NIN must contain only digits"),
  meterNumber: z.string().optional(),
});

export const registerUserStep3Schema = z.object({
  user_email: z.string().email("Invalid email address"),
});

export type RegisterUserStep1Data = z.infer<typeof registerUserStep1Schema>;
export type RegisterUserStep2Data = z.infer<typeof registerUserStep2Schema>;
export type RegisterUserStep3Data = z.infer<typeof registerUserStep3Schema>;
