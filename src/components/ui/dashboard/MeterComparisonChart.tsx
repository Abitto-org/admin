import { Box, Typography, Stack } from "@mui/material";
import { type FC } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import LinkText from "./LinkText";

const dummyData = [
  { name: "Registered Meters", value: 70, color: "#3266CC" },
  { name: "Linked Meters", value: 30, color: "#669900" },
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
            fontSize: { xs: "12px", md: "14px" },
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
                fontSize: { xs: "16px", md: "20px" },
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
                fontSize: { xs: "12px", md: "14px" },
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
                  borderRadius: "4px",
                  backgroundColor: item.color,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "12px", md: "14px" },
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
