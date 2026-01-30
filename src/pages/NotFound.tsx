import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
      bgcolor="#ffffff"
    >
      <Box textAlign="center" maxWidth={520} width="100%">
        {/* Big 404 */}
        <Typography
          fontSize="120px"
          fontWeight={900}
          lineHeight={1}
          letterSpacing="-4px"
          color="#000000"
          mb={2}
        >
          404
        </Typography>

        {/* Title */}
        <Typography fontSize="22px" fontWeight={600} color="#000000" mb={1}>
          This page wandered off
        </Typography>

        {/* Friendly copy */}
        <Typography fontSize="15px" color="text.secondary" mb={4}>
          Looks like the link is broken or the page never existed. No worries
          though, it happens to the best of us.
        </Typography>

        {/* Actions */}
        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
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
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.3,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Take me home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
