export interface MeterUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Meter {
  id: string;
  deviceId: string;
  status: "registered" | "unregistered" | "active" | "inactive";
  userId: string | null;
  valveStatus: boolean;
  meterNumber: string;
  estateId: string | null;
  houseNumber: string | null;
  estateName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MeterWithUser {
  meter: Meter;
  user: MeterUser | null;
}

export interface MeterStats {
  total: number;
  linked: number;
  unlinked: number;
}

export interface MeterPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetMetersResponse {
  status: string;
  message: string;
  data: {
    stats: MeterStats;
    meters: MeterWithUser[];
    pagination: MeterPagination;
  };
}

export interface GetMetersParams {
  page?: number;
  limit?: number;
  isLinked?: boolean;
  search?: string;
}

export type MeterLinkStatus = "success" | "pending" | "failed";

export interface MeterTableRow {
  id: string;
  meterId: string;
  meterNumber: string;
  user: string;
  userId?: string;
  linkStatus: MeterLinkStatus;
  date: string;
  address: string;
  status: string;
  valveStatus: boolean;
  estateId?: string;
  houseNumber?: string;
  estateName?: string;
  deviceId?: string;
}

export interface LinkMeterParams {
  meterNumber: string;
  userId: string;
  estateId: string;
  houseNumber: string;
  estateName?: string;
}

export interface LinkedMeter {
  id: string;
  deviceId: string;
  status: string;
  userId: string;
  valveStatus: boolean;
  meterNumber: string;
  estateId: string;
  houseNumber: string;
  estateName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LinkMeterResponse {
  status: string;
  message: string;
  data: LinkedMeter;
}

// meters.types.ts - Update these interfaces:

export interface UnlinkMeterParams {
  deviceId: string; // Changed from meterNumber to deviceId
}

export interface UnlinkedMeter {
  id: string;
  deviceId: string;
  status: string;
  userId: string | null;
  valveStatus: boolean;
  meterNumber: string;
  estateId: string | null;
  houseNumber: string | null;
  estateName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UnlinkMeterResponse {
  status: string; // Changed from success: boolean to status: string
  message: string;
  data: UnlinkedMeter; // Added data property
}

export interface MeterActionData {
  deviceId: string;
  meterNumber: string;
  userId?: string;
  userName?: string;
  estateId?: string;
  houseNumber?: string;
  estateName?: string;
}
