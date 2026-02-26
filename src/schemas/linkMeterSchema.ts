import { z } from "zod";

export const linkMeterSchema = z.object({
  meterNumber: z
    .string()
    .min(1, "Meter number is required")
    .regex(/^\d{3}-\d{3}-\d{3}$/, "Meter number must be in format XXX-XXX-XXX"),
  userId: z.string().min(1, "Please select a user"),
});

export type LinkMeterFormData = z.infer<typeof linkMeterSchema>;
