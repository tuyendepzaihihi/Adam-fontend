import { ApiClient } from "../service/ApiService";

//interface
export interface LoginRequest {
  password: string;
  username: string;
}

// function
export const requestLoginApp = (payload: LoginRequest) =>
  ApiClient.post("/authenticate", payload);
