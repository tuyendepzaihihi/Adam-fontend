import { ApiClient } from "../../service/ApiService";
// interface product detail
export interface UpdateInterface {
  id: number;
  isDelete: boolean;
  tagName: string;
  status: boolean;
}

export interface CreateInterface {
  colorList: [
    {
      id: 0;
    }
  ];

  sizeList: [
    {
      id: 0;
    }
  ];
}

export interface DeleteInterface {
  detail_product_id: number;
  product_id: number;
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
