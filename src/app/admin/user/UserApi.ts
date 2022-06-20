import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateInterface {
  id: number;
  isDelete: boolean;
  tagName: string;
  status: boolean;
}

export interface CreateInterface {
  email: string;
  password: string;
  role: string;
  username: string;
}

// function
// export const requestGetTagAll = (payload: any) =>
//   ApiClient.get("/admin/tag/findAll", payload);

// export const requestPutUpdateTag = (payload: UpdateInterface) =>
//   ApiClient.put("/admin/tag/update", payload);

// export const requestDeleteTag = (payload: { tag_id: number }) =>
//   ApiClient.delete("/admin/tag/delete", { params: payload });

export const requestPostCreateUser = (payload: CreateInterface) =>
  ApiClient.post("/admin/account/createAccount", payload);
