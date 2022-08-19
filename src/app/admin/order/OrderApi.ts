import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  order_id: number;
  status: number;
}

export interface GetOrderAdminDto {
  size: number;
  page: number;
  status?: number | null 
}

export interface PayloadOrderCallBack {
  detailCode?: any[],
  orderCode?: string,
  reason?: string,
  returnPrice?: number,
  status?: number,
  totalPrice?: number
}

// function
export const requestGetOrderAdminAll = (payload?: GetOrderAdminDto) =>
  ApiClient.get("/admin/order/findAllByPageble", { params: payload });

export const requestPutUpdateOrder = (payload: UpdateDto) =>
  ApiClient.put(
    `/admin/order/updateByIdAndStatus?order_id=${payload.order_id}&status=${payload.status}`,
    {}
  );
export const requestGetOrderStatistic = (payload?: any) =>
  ApiClient.get("/admin/order/orderSatistic", payload);

export const requestPostOrderCallBack = (payload: PayloadOrderCallBack) => ApiClient.post("admin/order/updateReturnOrder",payload)
