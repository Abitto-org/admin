/* eslint-disable @typescript-eslint/no-explicit-any */

export type IncidentStatus = "detected" | "resolved";
export type IncidentType = "leakage_detection" | "device_tampering";

export interface IncidentReport {
  id: string;
  meterId: string | null;
  deviceId: string | null;
  userId: string | null;
  status: IncidentStatus;
  type: IncidentType;
  detectedAt: string | null;
  resolvedAt: string | null;
  resolvedBy: string | null;
  resolutionNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentMeter {
  id: string | null;
  deviceId: string | null;
  status: string | null;
  userId: string | null;
  valveStatus: boolean | null;
  meterNumber: string | null;
  estateId: string | null;
  houseNumber: string | null;
  estateName: string | null;
  availableGasKg: string | null;
  lastSeenAt: string | null;
  isOnline: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface IncidentUser {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
}

export interface IncidentReportItem {
  report: IncidentReport;
  meter: IncidentMeter | null;
  user: IncidentUser | null;
}

export interface IncidentPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetIncidentsResponse {
  status: string;
  message: string;
  data: {
    reports: IncidentReportItem[];
    pagination: IncidentPagination;
  };
}

export interface GetIncidentsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: IncidentType;
  status?: IncidentStatus;
}

export interface ResolveIncidentResponse {
  status: string;
  message: string;
  data: any;
}

export interface IncidentTableRow {
  id: string;
  date: string;
  meterNumber: string;
  deviceId: string;
  severity: "high" | "medium";
  type: IncidentType;
  user: string;
  status: IncidentStatus;
  rawItem: IncidentReportItem;
}
