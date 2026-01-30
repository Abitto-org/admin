import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Geist, sans-serif",
  },
  palette: {
    primary: {
      main: "#669900",
    },
    text: {
      primary: "#414141",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "32px",
          padding: "12px 28px",
          height: "48px",
          textTransform: "none",
          fontWeight: 600,
        },
        contained: {
          backgroundColor: "#669900",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#558000",
          },
        },
      },
    },
  },
});

export default theme;
