import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  tagName: string;
  status: boolean;
}

export interface CreateDto {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: string;
  username: string;
}

// function
export const requestGetUserAll = (payload?: any) =>
  ApiClient.get("/admin/account/findAll", payload);

// export const requestPutUpdateTag = (payload: UpdateDto) =>
//   ApiClient.put("/admin/tag/update", payload);

export const requestDeleteUser = (payload: { accountIdList: number[] }) =>
  ApiClient.put("/admin/account/deleteByArrayId", payload);

export const requestPostCreateUser = (payload: CreateDto) =>
  ApiClient.post("/admin/account/createAdminAccount", payload);
