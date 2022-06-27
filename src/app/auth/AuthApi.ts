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

// function
export const requestLoginApp = (payload: LoginRequest) =>
  ApiClient.post("/auth/authenticate", payload);
