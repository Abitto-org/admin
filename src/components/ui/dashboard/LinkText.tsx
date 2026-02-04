import { Box, Typography } from "@mui/material";
import { NorthEast } from "@mui/icons-material";
import { type FC, type ReactNode } from "react";

interface LinkTextProps {
  text: string;
  onClick?: () => void;
  icon?: ReactNode; // Optional custom icon (defaults to NorthEast)
  showIcon?: boolean; // Whether to show icon (default: true)
  color?: string; // Custom text color (default: #669900)
  iconGap?: string; // Gap between text and icon (default: 4px)
}

const LinkText: FC<LinkTextProps> = ({
  text,
  onClick,
  icon,
  showIcon = true,
  color = "#669900",
  iconGap = "4px",
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: iconGap,
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              opacity: 0.8,
              textDecoration: "underline",
              textDecorationColor: color,
            }
          : {},
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: { xs: "12px", md: "14px" },
          lineHeight: "100%",
          letterSpacing: "0%",
          textTransform: "capitalize",
          color: color,
        }}
      >
        {text}
      </Typography>
      {showIcon && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon || (
            <NorthEast
              sx={{
                fontSize: "16px",
                color: color,
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default LinkText;
