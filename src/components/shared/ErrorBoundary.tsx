import { Component, type ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: { componentStack: string } | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRefresh = () => {
    globalThis.location.reload();
  };

  handleBack = () => {
    if (globalThis.history.length > 1) {
      globalThis.history.back();
    } else {
      globalThis.location.href = "/";
    }
  };

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;

      return (
        <Box
          minHeight="100dvh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={2}
          bgcolor="#ffffff"
        >
          <Box textAlign="center" maxWidth={560} width="100%">
            {/* Headline */}
            <Typography
              fontSize="56px"
              fontWeight={900}
              letterSpacing="-1px"
              mb={2}
            >
              Something broke
            </Typography>

            {/* Friendly text */}
            <Typography fontSize="15px" color="text.secondary" mb={4}>
              This part of the app ran into an unexpected problem. A quick
              refresh usually fixes it.
            </Typography>

            {/* Actions */}
            <Box
              display="flex"
              justifyContent="center"
              gap={2}
              mb={isDev ? 4 : 0}
            >
              <Button
                variant="outlined"
                onClick={this.handleBack}
                sx={{
                  px: 3,
                  py: 1.3,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Go back
              </Button>

              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleRefresh}
                sx={{
                  px: 4,
                  py: 1.3,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Refresh page
              </Button>
            </Box>

            {/* Dev-only details */}
            {isDev && this.state.error && (
              <Box textAlign="left">
                <Typography fontSize="14px" fontWeight={600} mb={1}>
                  Error details
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#fafafa",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    maxHeight: 220,
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    fontSize="12px"
                    fontWeight={600}
                    color="#b91c1c"
                    mb={1}
                  >
                    {this.state.error.name}: {this.state.error.message}
                  </Typography>

                  {this.state.error.stack && (
                    <Typography
                      component="pre"
                      fontSize="11px"
                      fontFamily="monospace"
                      color="#7f1d1d"
                      sx={{ whiteSpace: "pre-wrap" }}
                    >
                      {this.state.error.stack}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
