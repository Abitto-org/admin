import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  InputBase,
} from "@mui/material";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import { type FC } from "react";
import { linkRequests } from "@/data";
import ConnectedMetersCard from "@/components/ui/dashboard/ConnectedMetersCard";

const Settings: FC = () => {
  const handleEdit = (field: string) => {
    console.log(`Edit ${field} clicked`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: "24px", md: "16px" },
          mb: { xs: 2, md: 3 },
        }}
      >
        {/* Title and Subtitle */}
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "24px", md: "32px" },
              lineHeight: "120%",
              color: "#000000",
              mb: "8px",
            }}
          >
            Settings
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Get answers and support for your gas account
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: "8px",
          padding: { xs: "20px 12px", md: "32px 24px" },
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            sx={{
              width: "47px",
              height: "47px",
              backgroundColor: "#3266CC",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            {"JD"}
          </Avatar>

          {/* User Info */}
          <Stack spacing="4px">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#000000",
              }}
            >
              John Doe
            </Typography>

            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#424242",
              }}
            >
              johndoe@gmail.com
            </Typography>
          </Stack>
        </Box>
        <Stack
          direction="row"
          spacing="16px"
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            sx={{
              height: "48px",
              borderRadius: "32px",
              padding: "12px 24px",
              backgroundColor: "#FAFAFA",
              color: "#121212",
              fontWeight: 600,
              fontSize: { xs: "14px", sm: "16px" },
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            Change Password
          </Button>

          <Button
            sx={{
              height: "48px",
              borderRadius: "32px",
              padding: "12px 24px",
              backgroundColor: "#669900",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: { xs: "14px", sm: "16px" },
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#558000",
              },
            }}
          >
            Edit Profile
            <Box
              component="img"
              src={ButtonArrowIcon}
              alt="arrow"
              sx={{
                width: "20px",
                height: "20px",
              }}
            />
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          borderRadius: "8px",
          padding: { xs: "20px 12px", md: "32px 24px" },
          backgroundColor: "white",
          mt: 3,
        }}
      >
        {/* Title */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#000000",
              mb: "4px",
            }}
          >
            Connected Meters
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#424242",
              mt: "12px",
              mb: 2,
            }}
          >
            Get answers and support for your gas account
          </Typography>
        </Box>
        <Box
          className={"no-scrollbar"}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: "12px", sm: "10px" },
            height: {
              xs: "calc(100% - 40px)",
              sm: "calc(427px - 24px - 16px)",
            },
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#F5F5F5",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#D0D0D0",
              borderRadius: "3px",
              "&:hover": {
                backgroundColor: "#B0B0B0",
              },
            },
          }}
        >
          {linkRequests.map((request, index) => (
            <ConnectedMetersCard key={index} {...request} />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: "8px",
          padding: { xs: "16px 12px", md: "18px 24px" },
          backgroundColor: "white",
          mt: 3,
        }}
      >
        {/* Title */}
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#000000",
              mb: "4px",
            }}
          >
            Personal Details
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#424242",
              mt: "12px",
            }}
          >
            Get answers and support for your gas account
          </Typography>
        </Box>

        {/* Form Inputs */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: "24px",
          }}
        >
          {/* First Name */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="label"
              sx={{
                fontFamily: "Geist",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "8px",
                display: "block",
              }}
            >
              First Name
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "8px",
                border: "1px solid #EAEAEA",
                paddingTop: { xs: "12px", md: "18px" },
                paddingRight: { xs: "16px", md: "24px" },
                paddingBottom: { xs: "12px", md: "18px" },
                paddingLeft: { xs: "16px", md: "24px" },
              }}
            >
              <InputBase
                placeholder="Enter first name"
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                  "& input": {
                    padding: 0,
                    "&::placeholder": {
                      color: "#808080",
                      opacity: 1,
                    },
                  },
                }}
              />
              <Typography
                onClick={() => handleEdit("First Name")}
                sx={{
                  fontFamily: "Geist",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#669900",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Edit
              </Typography>
            </Box>
          </Box>

          {/* Last Name */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="label"
              sx={{
                fontFamily: "Geist",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "8px",
                display: "block",
              }}
            >
              Last Name
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "8px",
                border: "1px solid #EAEAEA",
                paddingTop: { xs: "12px", md: "18px" },
                paddingRight: { xs: "16px", md: "24px" },
                paddingBottom: { xs: "12px", md: "18px" },
                paddingLeft: { xs: "16px", md: "24px" },
              }}
            >
              <InputBase
                placeholder="Enter last name"
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                  "& input": {
                    padding: 0,
                    "&::placeholder": {
                      color: "#808080",
                      opacity: 1,
                    },
                  },
                }}
              />
              <Typography
                onClick={() => handleEdit("Last Name")}
                sx={{
                  fontFamily: "Geist",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#669900",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Edit
              </Typography>
            </Box>
          </Box>

          {/* Email Address */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="label"
              sx={{
                fontFamily: "Geist",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "8px",
                display: "block",
              }}
            >
              Email Address
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "8px",
                border: "1px solid #EAEAEA",
                paddingTop: { xs: "12px", md: "18px" },
                paddingRight: { xs: "16px", md: "24px" },
                paddingBottom: { xs: "12px", md: "18px" },
                paddingLeft: { xs: "16px", md: "24px" },
              }}
            >
              <InputBase
                type="email"
                placeholder="Enter email address"
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                  "& input": {
                    padding: 0,
                    "&::placeholder": {
                      color: "#808080",
                      opacity: 1,
                    },
                  },
                }}
              />
              <Typography
                onClick={() => handleEdit("Email Address")}
                sx={{
                  fontFamily: "Geist",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#669900",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Edit
              </Typography>
            </Box>
          </Box>

          {/* Phone Number */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="label"
              sx={{
                fontFamily: "Geist",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "8px",
                display: "block",
              }}
            >
              Phone Number
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "8px",
                border: "1px solid #EAEAEA",
                paddingTop: { xs: "12px", md: "18px" },
                paddingRight: { xs: "16px", md: "24px" },
                paddingBottom: { xs: "12px", md: "18px" },
                paddingLeft: { xs: "16px", md: "24px" },
              }}
            >
              <InputBase
                type="tel"
                placeholder="Enter phone number"
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                  "& input": {
                    padding: 0,
                    "&::placeholder": {
                      color: "#808080",
                      opacity: 1,
                    },
                  },
                }}
              />
              <Typography
                onClick={() => handleEdit("Phone Number")}
                sx={{
                  fontFamily: "Geist",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  color: "#669900",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Edit
              </Typography>
            </Box>
          </Box>

          {/* NIN - No Edit */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="label"
              sx={{
                fontFamily: "Geist",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "8px",
                display: "block",
              }}
            >
              NIN
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #EAEAEA",
                paddingTop: { xs: "12px", md: "18px" },
                paddingRight: { xs: "16px", md: "24px" },
                paddingBottom: { xs: "12px", md: "18px" },
                paddingLeft: { xs: "16px", md: "24px" },
              }}
            >
              <InputBase
                placeholder="Enter NIN"
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                  "& input": {
                    padding: 0,
                    "&::placeholder": {
                      color: "#808080",
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
