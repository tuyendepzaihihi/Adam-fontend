import { ApiClient } from "../service/ApiService";

//interface
export interface LoginRequest {
  password: string;
  username: string;
}

export interface ResultLogin {
  email: string;
  id: number;
  roles: string;
  token: string;
  username: string;
}

export interface RegisterDto {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: string;
  username: string;
}

// function
export const requestLoginApp = (payload: LoginRequest) =>
  ApiClient.post("/auth/authenticate", payload);

export const requestPostRegister = (payload: RegisterDto) =>
  ApiClient.post("/admin/account/createAdminAccount", payload);
