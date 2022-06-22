import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  tagName: string;
  status: boolean;
}

export interface CreateDto {
  tagName: string;
}

// function
export const requestGetTagAll = () => ApiClient.get("/admin/tag/findAll", {});

export const requestPutUpdateTag = (payload: UpdateDto) =>
  ApiClient.put("/admin/tag/update", payload);

export const requestDeleteTag = (payload: { tag_id: number }) =>
  ApiClient.delete("/admin/tag/delete", { params: payload });

export const requestPostCreateTag = (payload: CreateDto) =>
  ApiClient.post("/admin/tag/create", payload);
