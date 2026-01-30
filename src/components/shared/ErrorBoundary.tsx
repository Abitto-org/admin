import { Component, type ReactNode } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

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
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    globalThis.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;

      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          px={2}
          bgcolor="#f5f5f5"
        >
          <Box maxWidth="600px" width="100%">
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "12px",
                border: "1px solid #EDEDED",
              }}
            >
              {/* Icon and Title */}
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <ErrorOutline sx={{ fontSize: 40, color: "#d32f2f" }} />
                <Typography fontSize="24px" fontWeight={700} color="#000000">
                  Oops! Something went wrong
                </Typography>
              </Box>

              {/* Description */}
              <Typography
                fontSize="14px"
                fontWeight={400}
                color="text.primary"
                mb={3}
              >
                {isDev
                  ? "An error occurred while rendering this component. Check the details below."
                  : "We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists."}
              </Typography>

              {/* Dev Mode: Error Details */}
              {isDev && this.state.error && (
                <Box mb={3}>
                  <Typography
                    fontSize="14px"
                    fontWeight={600}
                    color="#000000"
                    mb={1}
                  >
                    Error Details:
                  </Typography>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "8px",
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    <Typography
                      fontSize="12px"
                      fontWeight={600}
                      color="#dc2626"
                      mb={1}
                    >
                      {this.state.error.name}: {this.state.error.message}
                    </Typography>
                    {this.state.error.stack && (
                      <Typography
                        component="pre"
                        fontSize="11px"
                        fontFamily="monospace"
                        color="#991b1b"
                        sx={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {this.state.error.stack}
                      </Typography>
                    )}
                  </Paper>
                </Box>
              )}

              {/* Dev Mode: Component Stack */}
              {isDev && this.state.errorInfo?.componentStack && (
                <Box mb={3}>
                  <Typography
                    fontSize="14px"
                    fontWeight={600}
                    color="#000000"
                    mb={1}
                  >
                    Component Stack:
                  </Typography>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "#fef3c7",
                      border: "1px solid #fde68a",
                      borderRadius: "8px",
                      maxHeight: "150px",
                      overflowY: "auto",
                    }}
                  >
                    <Typography
                      component="pre"
                      fontSize="11px"
                      fontFamily="monospace"
                      color="#92400e"
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {this.state.errorInfo.componentStack}
                    </Typography>
                  </Paper>
                </Box>
              )}

              {/* Action Button */}
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={this.handleReset}>Go to Home</Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
