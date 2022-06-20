import { ApiClient } from "../../service/ApiService";
// interface color
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  colorName: string;
  status: boolean;
}

export interface CreateDto {
  colorName: string;
}

// function color
export const requestGetColorAll = (payload: any) =>
  ApiClient.get("/admin/color/findAll", payload);

export const requestPutUpdateColor = (payload: UpdateDto) =>
  ApiClient.put("/admin/color/update", payload);

export const requestDeleteColor = (payload: { color_id: number }) =>
  ApiClient.delete("/admin/color/delete", { params: payload });

export const requestPostCreateColor = (payload: CreateDto) =>
  ApiClient.post("/admin/color/create", payload);

// interface size
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  sizeName: string;
  status: boolean;
}

export interface CreateDto {
  sizeName: string;
}

// function size
export const requestGetSizeAll = (payload: any) =>
  ApiClient.get("/admin/size/findAll", payload);

export const requestPutUpdateSize = (payload: UpdateDto) =>
  ApiClient.put("/admin/size/update", payload);

export const requestDeleteSize = (payload: { size_id: number }) =>
  ApiClient.delete("/admin/size/delete", { params: payload });

export const requestPostCreateSize = (payload: CreateDto) =>
  ApiClient.post("/admin/size/create", payload);
