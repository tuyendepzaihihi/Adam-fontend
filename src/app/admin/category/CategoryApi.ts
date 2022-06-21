import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  categoryName: string;
}

export interface CreateDto {
  categoryName: string;
  categoryParentId: number;
}

// function
export const requestGetCategoryAll = () =>
  ApiClient.get("/admin/category/findAll", {});

export const requestPutUpdateCategory = (payload: UpdateDto) =>
  ApiClient.put("/admin/category/update", payload);

export const requestDeleteCategory = (payload: { category_id: number }) =>
  ApiClient.delete("/admin/category/delete", { params: payload });

export const requestPostCreateCategory = (payload: CreateDto) =>
  ApiClient.post("/admin/category/create", payload);
