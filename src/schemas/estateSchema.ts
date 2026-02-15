// createEstateSchema.ts
import { z } from "zod";

export const createEstateSchema = z.object({
  name: z.string().min(1, "Estate name is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
});

export type CreateEstateFormData = z.infer<typeof createEstateSchema>;
