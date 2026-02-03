import { Box, Typography, Stack } from "@mui/material";
import { NorthEast } from "@mui/icons-material";
import { type FC } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const dummyData = [
  { name: "Registered", value: 70, color: "#3266CC" },
  { name: "Linked", value: 30, color: "#669900" },
];

const MeterComparisonChart: FC = () => {
  const linkedPercentage = Math.round(
    (dummyData[1].value / (dummyData[0].value + dummyData[1].value)) * 100,
  );

  const handleViewMeters = () => {
    console.log("View meters clicked");
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
              data={dummyData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
            >
              {dummyData.map((entry, index) => (
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
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#000000",
              mb: "8px",
            }}
          >
            {linkedPercentage}%
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
            registered meters linked
          </Typography>
        </Box>
      </Box>

      {/* Legend and View Link */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "16px",
        }}
      >
        {/* Legend */}
        <Stack direction="row" spacing="16px">
          {dummyData.map((item, index) => (
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
                  borderRadius: "2px",
                  backgroundColor: item.color,
                }}
              />
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
                {item.name}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* View Meters Link */}
        <Box
          onClick={handleViewMeters}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#669900",
            }}
          >
            View Meters
          </Typography>
          <NorthEast
            sx={{
              fontSize: "16px",
              color: "#669900",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MeterComparisonChart;
