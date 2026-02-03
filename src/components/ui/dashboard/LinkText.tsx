import { Box, Typography } from "@mui/material";
import { NorthEast } from "@mui/icons-material";
import { type FC } from "react";

interface LinkTextProps {
  text: string;
  onClick?: () => void;
}

const LinkText: FC<LinkTextProps> = ({ text, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              opacity: 0.8,
              textDecoration: "underline",
              textDecorationColor: "#669900",
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
          color: "#669900",
        }}
      >
        {text}
      </Typography>
      <NorthEast
        sx={{
          fontSize: "16px",
          color: "#669900",
        }}
      />
    </Box>
  );
};

export default LinkText;
