import { ApiClient } from "../../service/ApiService";

// interface favorite
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  favoriteName: string;
  status: boolean;
}

export interface CreateDto {
  favoriteName: string;
}

// function favorite
export const requestGetSizeAll = (payload: any) =>
  ApiClient.get("/admin/favorite/findAll", payload);

export const requestPutUpdateSize = (payload: UpdateDto) =>
  ApiClient.put("/admin/favorite/update", payload);

export const requestDeleteSize = (payload: any) =>
  ApiClient.delete("/admin/favorite/delete", { params: payload });

export const requestPostCreateSize = (payload: CreateDto) =>
  ApiClient.post("/admin/favorite/create", payload);
