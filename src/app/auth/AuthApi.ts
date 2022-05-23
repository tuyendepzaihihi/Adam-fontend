import { handlePut } from "../service/Services";

export const requestLogin = async (payload: any) =>
  handlePut("customer/login", payload);
