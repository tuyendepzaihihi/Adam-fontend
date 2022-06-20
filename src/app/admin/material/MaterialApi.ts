import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateInterface {
  id: number;
  isDelete: boolean;
  materialName: string;
  status: boolean;
}

export interface CreateInterface {
  materialName: string;
}

// function
export const requestGetMaterialAll = (payload: any) =>
  ApiClient.get("/admin/material/findAll", payload);

export const requestPutUpdateMaterial = (payload: UpdateInterface) =>
  ApiClient.put("/admin/material/update", payload);

export const requestDeleteMaterial = (payload: { material_id: number }) =>
  ApiClient.delete("/admin/material/delete", { params: payload });

export const requestPostCreateMaterial = (payload: CreateInterface) =>
  ApiClient.post("/admin/material/create", payload);
