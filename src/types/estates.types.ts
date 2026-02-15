// estates.types.ts
export interface Estate {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  totalMeters: string;
  onlineMeters: string;
}

export interface EstateStats {
  totalEstates: number;
  totalMetersOnline: number;
  inactiveEstates: number;
}

export interface EstatePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetEstatesResponse {
  status: string;
  message: string;
  data: {
    stats: EstateStats;
    estates: Estate[];
    pagination: EstatePagination;
  };
}

export interface GetEstatesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateEstateParams {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: string;
  longitude: string;
}

export interface CreateEstateResponse {
  status: string;
  message: string;
  data: Estate;
}

export type EstateStatusType = "active" | "inactive";

export interface EstateTableRow {
  id: string;
  name: string;
  address: string;
  dateCreated: string;
  totalMeters: string;
  onlineMeters: string;
  status: EstateStatusType;
}
