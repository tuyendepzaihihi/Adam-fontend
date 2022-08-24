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
  code: number,
}

// function
export const requestLoginApp = (payload: LoginRequest) =>
  ApiClient.post("/auth/authenticate", payload);

export const requestPostRegister = (payload: RegisterDto) =>
  ApiClient.post("/admin/account/createAccount", payload);

export const requestVerifyPhone = (payload: {phone: string}) =>
ApiClient.post(`/admin/account/verify?phone_number=${payload.phone}`, {});
