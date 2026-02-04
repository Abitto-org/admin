import { Box } from "@mui/material";
import { type FC } from "react";
import { type BadgeProps } from "./types";

const Badge: FC<BadgeProps> = ({ type, value, config }) => {
  // Get color configuration for this badge type and value
  const colorConfig = config[type]?.[value] || {
    bg: "#F5F5F5",
    text: "#424242",
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 8px",
        borderRadius: "12px",
        backgroundColor: colorConfig.bg,
        fontWeight: 600,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "0%",
        textTransform: "capitalize",
        color: colorConfig.text,
      }}
    >
      {value}
    </Box>
  );
};

export default Badge;
