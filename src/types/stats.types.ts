export interface UserStats {
  total: number;
  increasePastMonth: number;
  joinedToday: number;
  activeToday: number;
}

export interface RevenueStats {
  total: string;
  today: string;
  processedLast24hrs: string;
}

export interface MeterStats {
  total: number;
  active: number;
  registered: number;
  unregistered: number;
  linked: number;
}

export interface GasSoldStats {
  totalKg: string;
  todayKg: string;
}

export interface UsageChartPoint {
  date: string;
  totalKg: number;
}

export interface UsageStats {
  totalKgThisWeek: string;
  totalKgUsedToday: string;
  percentageChangePastWeek: number;
  chart: UsageChartPoint[];
}

export interface PlatformStats {
  users: UserStats;
  revenue: RevenueStats;
  meters: MeterStats;
  gasSold: GasSoldStats;
  usage: UsageStats;
}

export interface GetStatsResponse {
  status: string;
  message: string;
  data: PlatformStats;
}
