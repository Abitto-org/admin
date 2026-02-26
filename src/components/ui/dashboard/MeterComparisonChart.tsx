import { Box, Typography, Stack } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import LinkText from "./LinkText";
import { useGetMeters } from "@/hooks/useMeters";
import { useNavigate } from "react-router-dom";

const COLORS = {
  registered: "#3266CC",
  linked: "#669900",
};

const MeterComparisonChart = () => {
  const { data, isLoading } = useGetMeters({ page: 1, limit: 1 });
  const navigate = useNavigate();

  const stats = data?.data?.stats || { total: 0, linked: 0, unlinked: 0 };

  const chartData = [
    { name: "Registered Meters", value: stats.total, color: COLORS.registered },
    { name: "Linked Meters", value: stats.linked, color: COLORS.linked },
  ];

  const linkedPercentage =
    stats.total > 0 ? Math.round((stats.linked / stats.total) * 100) : 0;

  const handleViewMeters = () => {
    navigate("/meters");
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "24px",
        height: "427px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: "24px" }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "-1%",
            textTransform: "capitalize",
            color: "#000000",
            mb: "8px",
          }}
        >
          Registered Meter vs Linked Meter
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "-1%",
            textTransform: "capitalize",
            color: "#414141",
          }}
        >
          Overview of meter registration and linking
        </Typography>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "18px", md: "20px" },
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "8px",
              }}
            >
              {isLoading ? "..." : `${linkedPercentage}%`}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#414141",
                mb: 2,
              }}
            >
              registered meters <br /> linked
            </Typography>
            <LinkText text="View Meters" onClick={handleViewMeters} />
          </Box>
        </Box>
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "16px",
        }}
      >
        <Stack direction="row" spacing="16px">
          {chartData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "4px",
                  backgroundColor: item.color,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "-1%",
                  textTransform: "capitalize",
                  color: "#414141",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default MeterComparisonChart;
