export interface GetSettingsResponse {
  status: string;
  message: string;
  data: SettingsData;
}

export interface UpdateSettingsResponse {
  status: string;
  message: string;
  data: SettingsData;
}

export interface SettingsData {
  id: string;
  timezone: string;
  currency: string;
  minWalletTopup: string;
  gasPricePerKg: string;
  meterResyncIntervalMinutes: number;
  autoUnlinkInactiveMeterDays: number;
  enableAdminAlerts: boolean;
  notifyAdminType: string;
  specificAdminIds: string[];
  updatedAt: Date;
}

export interface UpdateSettingsPayload {
  timezone: string;
  currency: string;
  minWalletTopup: string;
  gasPricePerKg: string;
  meterResyncIntervalMinutes: number;
  autoUnlinkInactiveMeterDays: number;
  enableAdminAlerts: boolean;
  notifyAdminType: string;
}
