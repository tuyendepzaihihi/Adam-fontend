import { ApiClient } from "../../service/ApiService";
// interface
export interface GetOrderDto {
  account_id: number;
  status: number;
}
// function
export const requestGetOrderAll = (payload: GetOrderDto) =>
  ApiClient.get("user/order/findByAccountId", { params: payload });

export const requestPutUpdateorder = (payload: any) =>
  ApiClient.put("/order/update", payload);

export const requestDeleteorder = (payload: { order_id: number }) =>
  ApiClient.delete("/order/delete", { params: payload });

export const requestPostCreateorder = (payload: any) =>
  ApiClient.post("/order/create", payload);

export const requestGetOrderDetail = (payload: { order_id: number }) =>
  ApiClient.get("/order/detail", payload);
