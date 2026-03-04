export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface GetActivitiesResponse {
  status: string;
  message: string;
  data: Activity[];
}

export interface GetActivitiesParams {
  page?: number;
  limit?: number;
}
