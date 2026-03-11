import type { User } from "./users.types";
export interface GetAdminsResponse {
  status: string;
  message: string;
  data: User[];
}

export interface ChangeAdminRolePayload {
  adminRoleId: string;
}

export interface ChangeAdminRoleResponse {
  status: string;
  message: string;
  data: Partial<User>;
}

export interface DeleteAdminResponse {
  status: string;
  message: string;
}
