import { Box, Typography } from "@mui/material";
import { type FC } from "react";
import TrendUpIcon from "@/assets/icons/trend-up.svg";

interface TrendTextProps {
  text: string;
}

const TrendText: FC<TrendTextProps> = ({ text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <Box
        component="img"
        src={TrendUpIcon}
        alt="trend up"
        sx={{
          width: "16px",
          height: "16px",
        }}
      />
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "100%",
          letterSpacing: "0%",
          textTransform: "capitalize",
          color: "#2EAE4E",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default TrendText;