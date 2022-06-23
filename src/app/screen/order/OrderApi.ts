import { ApiClient } from "../../service/ApiService";
// interface
// function
export const requestGetCartAll = (payload: any) =>
  ApiClient.get("/cart/findAll", payload);

export const requestPutUpdateCart = (payload: any) =>
  ApiClient.put("/cart/update", payload);

export const requestDeleteCart = (payload: { cart_id: number }) =>
  ApiClient.delete("/cart/delete", { params: payload });

export const requestPostCreateCart = (payload: any) =>
  ApiClient.post("/cart/create", payload);

export const requestGetOrderDetail = (payload: { order_id: number }) =>
  ApiClient.get("/order/detail", payload);
