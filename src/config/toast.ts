import type { DefaultToastOptions } from "react-hot-toast";

export const toastOption: DefaultToastOptions = {
  style: {
    background: "#f3f4f6",
    color: "#000",
    textTransform: "capitalize",
    fontSize: "clamp(14px, 2.5vw, 16px)",
    borderRadius: "6px",
    padding: "clamp(12px, 3vw, 16px)",
    maxWidth: "90vw",
    wordBreak: "break-word",
  },
  success: {
    style: {
      background: "#10b981",
      color: "#fff",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#10b981",
    },
  },
  error: {
    style: {
      background: "#ef4444",
      color: "#fff",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#ef4444",
    },
  },
};
