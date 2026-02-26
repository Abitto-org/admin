import { Box, Typography, Stack } from "@mui/material";
import { type FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import TrendUpBlueIcon from "@/assets/icons/trend-up-blue.svg";
import { useGetStats } from "@/hooks/useStats";

const formatXAxis = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatKg = (value: number) => {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return `${value}`;
};

const TotalUsageChart: FC = () => {
  const { data: statsData, isLoading } = useGetStats();
  const usage = statsData?.data?.usage;

  const chartData = usage?.chart ?? [];
  const thisWeek = Number(usage?.totalKgThisWeek ?? 0);
  const todayKg = Number(usage?.totalKgUsedToday ?? 0);
  const pctChange = usage?.percentageChangePastWeek;

  const hasPctChange =
    pctChange !== undefined && pctChange !== null && chartData.length > 0;

  const isPositive = (pctChange ?? 0) >= 0;

  const trendColor = isPositive ? "#3266CC" : "#EA0000";
  const trendIcon = isPositive ? TrendUpBlueIcon : undefined;
  const trendLabel = hasPctChange
    ? `${isPositive ? "+" : ""}${pctChange.toLocaleString(undefined, { maximumFractionDigits: 2 })}% vs Last Week`
    : "N/A vs Last Week";

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: { xs: "12px", md: "24px" },
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
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#000000",
              mb: "8px",
            }}
          >
            Total Usage
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {trendIcon && (
              <Box
                component="img"
                src={trendIcon}
                alt="trend"
                sx={{ width: "16px", height: "16px" }}
              />
            )}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                color: trendColor,
              }}
            >
              {trendLabel}
            </Typography>
          </Box>
        </Box>

        {/* Week Comparison */}
        <Stack direction="row" spacing="16px" alignItems="center">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "14px", md: "16px" },
                lineHeight: "100%",
                color: "#000000",
                mb: "4px",
              }}
            >
              {isLoading
                ? "—"
                : `${Number(thisWeek).toLocaleString(undefined, { maximumFractionDigits: 2 })}kg`}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "12px", md: "14px" },
                color: "#414141",
              }}
            >
              This Week
            </Typography>
          </Box>

          <Box
            sx={{ width: "1px", height: "32px", backgroundColor: "#DFDFDF" }}
          />

          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "14px", md: "16px" },
                lineHeight: "100%",
                color: "#000000",
                mb: "4px",
              }}
            >
              {isLoading
                ? "—"
                : `${Number(todayKg).toLocaleString(undefined, { maximumFractionDigits: 2 })}kg`}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "12px", md: "14px" },
                color: "#414141",
              }}
            >
              Today
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Chart */}
      <Box sx={{ flex: 1 }}>
        {!isLoading && chartData.length === 0 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#757575" }}>
              No usage data available
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E0EBCC4D" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" stroke="transparent" />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                tickFormatter={formatXAxis}
                tick={{ fill: "#414141", fontWeight: 600, fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                tickFormatter={formatKg}
                tick={{ fill: "#414141", fontWeight: 600, fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="totalKg"
                stroke="#669900"
                strokeWidth={1.5}
                fill="url(#colorUsage)"
                dot={{ fill: "#669900", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, fill: "#669900" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
};

export default TotalUsageChart;
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0].value ?? 0;
  const date = new Date(label ?? "");
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E0E0E0",
        borderRadius: "8px",
        padding: "10px 14px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        minWidth: "140px",
      }}
    >
      <Typography
        sx={{ fontSize: "12px", color: "#757575", mb: "6px", fontWeight: 500 }}
      >
        {formattedDate}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#669900",
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{ fontSize: "13px", fontWeight: 700, color: "#000000" }}
        >
          {Number(value).toLocaleString(undefined, {
            maximumFractionDigits: 3,
          })}{" "}
          kg
        </Typography>
      </Box>
    </Box>
  );
};
