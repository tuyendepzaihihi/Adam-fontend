import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  order_id: number;
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
  ApiClient.put("/admin/order/updateByIdAndStatus", { params: payload });
export const requestGetOrderStatistic = (payload?: any) =>
  ApiClient.get("/admin/order/orderSatistic", payload);
