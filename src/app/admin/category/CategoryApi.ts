import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  categoryName: string;
  status: boolean;
}

export interface CreateDto {
  categoryName: string;
  categoryParentId: number;
}

// function
export const requestGetMaterialAll = (payload: any) =>
  ApiClient.get("/admin/category/findAll", payload);

export const requestPutUpdateMaterial = (payload: UpdateDto) =>
  ApiClient.put("/admin/category/update", payload);

export const requestDeleteMaterial = (payload: { category_id: number }) =>
  ApiClient.delete("/admin/category/delete", { params: payload });

export const requestPostCreateMaterial = (payload: CreateDto) =>
  ApiClient.post("/admin/category/create", payload);
