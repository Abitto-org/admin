import { Box, Typography } from "@mui/material";
import { type FC, type ReactNode } from "react";
import TrendUpIcon from "@/assets/icons/trend-up.svg";

interface TrendTextProps {
  text: string;
  icon?: ReactNode; // Optional custom icon (defaults to TrendUpIcon)
  showIcon?: boolean; // Whether to show icon at all (default: true)
  color?: string; // Custom text color (default: #2EAE4E)
  iconGap?: string; // Gap between icon and text (default: 4px)
}

const TrendText: FC<TrendTextProps> = ({
  text,
  icon,
  showIcon = true,
  color = "#2EAE4E",
  iconGap = "4px",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: iconGap,
      }}
    >
      {showIcon && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon || (
            <Box
              component="img"
              src={TrendUpIcon}
              alt="trend up"
              sx={{
                width: "16px",
                height: "16px",
              }}
            />
          )}
        </Box>
      )}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: { xs: "12px", sm: "14px" },
          lineHeight: "100%",
          letterSpacing: "0%",
          textTransform: "capitalize",
          color: color,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default TrendText;
