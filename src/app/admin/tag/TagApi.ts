import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateInterface {
  id: number;
  isDelete: boolean;
  tagName: string;
  status: boolean;
}

export interface CreateInterface {
  tagName: string;
}

// function
export const requestGetTagAll = (payload: any) =>
  ApiClient.get("/admin/tag/findAll", payload);

export const requestPutUpdateTag = (payload: UpdateInterface) =>
  ApiClient.put("/admin/tag/update", payload);

export const requestDeleteTag = (payload: { tag_id: number }) =>
  ApiClient.delete("/admin/tag/delete", { params: payload });

export const requestPostCreateTag = (payload: CreateInterface) =>
  ApiClient.post("/admin/tag/create", payload);
