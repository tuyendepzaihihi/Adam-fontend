import { ApiClient } from "../../service/ApiService";

// interface favorite
export interface UpdateInterface {
  id: number;
  isDelete: boolean;
  favoriteName: string;
  status: boolean;
}

export interface CreateInterface {
  favoriteName: string;
}

// function favorite
export const requestGetSizeAll = (payload: any) =>
  ApiClient.get("/admin/favorite/findAll", payload);

export const requestPutUpdateSize = (payload: UpdateInterface) =>
  ApiClient.put("/admin/favorite/update", payload);

export const requestDeleteSize = (payload: any) =>
  ApiClient.delete("/admin/favorite/delete", { params: payload });

export const requestPostCreateSize = (payload: CreateInterface) =>
  ApiClient.post("/admin/favorite/create", payload);
