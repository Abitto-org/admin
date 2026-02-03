import { Box, Typography, Stack } from "@mui/material";
import { type FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import TrendUpBlueIcon from "@/assets/icons/trend-up-blue.svg";

const dummyData = [
  { day: "Mon", usage: 150 },
  { day: "Tue", usage: 200 },
  { day: "Wed", usage: 180 },
  { day: "Thu", usage: 250 },
  { day: "Fri", usage: 220 },
  { day: "Sat", usage: 280 },
  { day: "Sun", usage: 300 },
];

const TotalUsageChart: FC = () => {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: "24px",
        }}
      >
        {/* Title and Trend */}
        <Box>
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
            Total Usage
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Box
              component="img"
              src={TrendUpBlueIcon}
              alt="trend up"
              sx={{
                width: "16px",
                height: "16px",
              }}
            />
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#3266CC",
              }}
            >
              20% vs Last Week
            </Typography>
          </Box>
        </Box>

        {/* Week Comparison */}
        <Stack direction="row" spacing="16px" alignItems="center">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "4px",
              }}
            >
              300kg
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
              This Week
            </Typography>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: "1px",
              height: "32px",
              backgroundColor: "#DFDFDF",
            }}
          />

          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#000000",
                mb: "4px",
              }}
            >
              250kg
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
              Last Week
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Chart */}
      <Box sx={{ flex: 1, height: "278px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dummyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="53.25%"
                  stopColor="rgba(224, 235, 204, 0.3)"
                  stopOpacity={1}
                />
                <stop
                  offset="99.53%"
                  stopColor="rgba(255, 255, 255, 0)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke="transparent" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#414141",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "-1%",
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[0, 50, 100, 150, 200, 250, 300]}
              tick={{
                fill: "#414141",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "-1%",
              }}
            />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#669900"
              strokeWidth={1.2}
              dot={false}
              fill="url(#colorUsage)"
              fillOpacity={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default TotalUsageChart;