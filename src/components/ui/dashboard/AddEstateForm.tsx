import { Box, Typography, InputBase } from "@mui/material";
import { type FC, useEffect } from "react";
import {
  useForm,
  Controller,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEstate } from "@/hooks/useEstates";
import toast from "react-hot-toast";
import {
  createEstateSchema,
  type CreateEstateFormData,
} from "@/schemas/estateSchema";

interface AddEstateFormProps {
  onClose: () => void;
  open?: boolean;
}

const AddEstateForm: FC<AddEstateFormProps> = ({ onClose, open = true }) => {
  const { mutate: createEstate, isPending } = useCreateEstate();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateEstateFormData>({
    resolver: zodResolver(createEstateSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: CreateEstateFormData) => {
    createEstate(data, {
      onSuccess: () => {
        toast.success("Estate created successfully");
        onClose();
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to create estate";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
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
          Add New Estate
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "150%",
            color: "#414141",
          }}
        >
          Create a new estate in the system
        </Typography>
      </Box>

      {/* Form Content */}
      <Box
        className="no-scrollbar"
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 1,
        }}
      >
        <InputField
          name="name"
          label="Estate Name"
          placeholder="Enter estate name"
          control={control}
          errors={errors}
        />
        <InputField
          name="description"
          label="Description"
          placeholder="Enter description"
          multiline
          control={control}
          errors={errors}
        />
        <InputField
          name="address"
          label="Address"
          placeholder="Enter address"
          control={control}
          errors={errors}
        />
        <InputField
          name="city"
          label="City"
          placeholder="Enter city"
          control={control}
          errors={errors}
        />
        <InputField
          name="state"
          label="State"
          placeholder="Enter state"
          control={control}
          errors={errors}
        />
        <InputField
          name="country"
          label="Country"
          placeholder="Enter country"
          control={control}
          errors={errors}
        />
        <InputField
          name="zipCode"
          label="Zip Code"
          placeholder="Enter zip code"
          control={control}
          errors={errors}
        />
        <InputField
          name="latitude"
          label="Latitude"
          placeholder="Enter latitude"
          control={control}
          errors={errors}
        />
        <InputField
          name="longitude"
          label="Longitude"
          placeholder="Enter longitude"
          control={control}
          errors={errors}
        />
      </Box>

      {/* Submit Button */}
      <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #F5F5F5" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            onClick={onClose}
            sx={{
              flex: 1,
              height: "48px",
              borderRadius: "32px",
              border: "1px solid #669900",
              backgroundColor: "#FFFFFF",
              color: "#669900",
              fontWeight: 600,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            Cancel
          </Box>
          <Box
            component="button"
            type="submit"
            disabled={isPending}
            sx={{
              flex: 1,
              height: "48px",
              borderRadius: "32px",
              padding: "12px 24px",
              backgroundColor: "#669900",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "16px",
              border: "none",
              cursor: isPending ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: isPending ? "#669900" : "#558000",
              },
              "&:disabled": {
                backgroundColor: "#BDBDBD",
                color: "#FFFFFF",
              },
            }}
          >
            {isPending ? "Creating..." : "Create Estate"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEstateForm;

const InputField: FC<{
  name: keyof CreateEstateFormData;
  label: string;
  placeholder: string;
  multiline?: boolean;
  control: Control<
    CreateEstateFormData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    CreateEstateFormData
  >;
  errors: FieldErrors<CreateEstateFormData>;
}> = ({ name, label, placeholder, multiline = false, control, errors }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "14px",
          color: "#000000",
          mb: "8px",
        }}
      >
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <InputBase
              {...field}
              placeholder={placeholder}
              multiline={multiline}
              rows={multiline ? 3 : 1}
              sx={{
                width: "100%",
                border: "1px solid #EDEDED",
                borderRadius: "8px",
                padding: "10px",
                fontFamily: "Geist",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "-2%",
                color: "#000000",
                "&::placeholder": {
                  fontFamily: "Geist",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "-2%",
                  textTransform: "capitalize",
                  color: "#AAAAAA",
                },
                ...(errors[name] && {
                  borderColor: "#D32F2F",
                }),
              }}
            />
            {errors[name] && (
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#D32F2F",
                  mt: "4px",
                  ml: "16px",
                }}
              >
                {errors[name]?.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
};
