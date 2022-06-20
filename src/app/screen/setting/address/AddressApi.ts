import { ApiClient } from "../../../service/ApiService";

// interface product detail
export interface UpdateInterface {
  addressDetail: string;
  district: { id: number };
  province: { id: number };
  ward: { id: number };
  phone: string;
  name: string;
  isDefault: number;
}

export interface CreateInterface {
  addressDetail: string;
  district: { id: number };
  province: { id: number };
  ward: { id: number };
  phone: string;
  name: string;
  isDefault: number;
}

export interface DeleteInterface {
  address_id: number;
}

// function product detail
export const requestGetDetailProductAll = (payload: any) =>
  ApiClient.get("/admin/detailProduct/findAll", payload);

export const requestPutUpdateDetailProduct = (payload: UpdateInterface) =>
  ApiClient.put("/admin/detailProduct/update", payload);

export const requestDeleteDetailProduct = (payload: DeleteInterface) =>
  ApiClient.delete("/admin/detailProduct/delete", { params: payload });

export const requestPostCreateDetailProduct = (payload: CreateInterface) =>
  ApiClient.post("/admin/detailProduct/create", payload);
