import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      width="100%"
    >
      <CircularProgress
        size={40}
        thickness={4}
        sx={{
          color: "#669900",
        }}
      />
    </Box>
  );
};

export default LoadingSpinner;