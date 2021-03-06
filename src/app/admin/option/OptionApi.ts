import { ApiClient } from "../../service/ApiService";
// interface color
export interface UpdateColorDto {
  id: number;
  isDelete: boolean;
  colorName: string;
  status: boolean;
}

export interface CreateColorDto {
  colorName: string;
}

// function color
export const requestGetColorAll = (payload?: any) =>
  ApiClient.get("/admin/color/findAll", payload);

export const requestPutUpdateColor = (payload: UpdateColorDto) =>
  ApiClient.put("/admin/color/update", payload);

export const requestDeleteColor = (payload: { color_id: number }) =>
  ApiClient.delete("/admin/color/delete", { params: payload });

export const requestPostCreateColor = (payload: CreateColorDto) =>
  ApiClient.post("/admin/color/create", payload);

// interface size
export interface UpdateSizeDto {
  id: number;
  isDelete: boolean;
  sizeName: string;
  status: boolean;
}

export interface CreateSizeDto {
  sizeName: string;
}

// function size
export const requestGetSizeAll = (payload?: any) =>
  ApiClient.get("/admin/size/findAll", payload);

export const requestPutUpdateSize = (payload: UpdateSizeDto) =>
  ApiClient.put("/admin/size/update", payload);

export const requestDeleteSize = (payload: { size_id: number }) =>
  ApiClient.delete("/admin/size/delete", { params: payload });

export const requestPostCreateSize = (payload: CreateSizeDto) =>
  ApiClient.post("/admin/size/create", payload);
