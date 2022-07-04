import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  id: number;
  status: boolean;
}

export interface GetOrderAdminDto {
  size: number;
  page: number;
}

// function
export const requestGetOrderAdminAll = (payload?: GetOrderAdminDto) =>
  ApiClient.get("/admin/order/findAllByPageble", { params: payload });

export const requestPutUpdateOrder = (payload: UpdateDto) =>
  ApiClient.put("/admin/order/update", payload);
