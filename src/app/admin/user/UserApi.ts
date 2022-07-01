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
  password: string;
  role: string;
  username: string;
}

// function
export const requestGetUserAll = (payload?: any) =>
  ApiClient.get("/admin/account/findAll", payload);

// export const requestPutUpdateTag = (payload: UpdateDto) =>
//   ApiClient.put("/admin/tag/update", payload);

// export const requestDeleteTag = (payload: { tag_id: number }) =>
//   ApiClient.delete("/admin/tag/delete", { params: payload });

export const requestPostCreateUser = (payload: CreateDto) =>
  ApiClient.post("/admin/account/createAccount", payload);
