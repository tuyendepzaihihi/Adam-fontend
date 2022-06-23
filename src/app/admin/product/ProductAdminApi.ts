import { ApiClient } from "../../service/ApiService";
// interface product detail
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  tagName: string;
  status: boolean;
}

export interface CreateDto {
  colorList: [
    {
      id: number;
    }
  ];

  sizeList: [
    {
      id: number;
    }
  ];
}

export interface DeleteInterface {
  detail_product_id: number;
  product_id: number;
}

// function product detail
export const requestGetDetailProductAll = (payload?: any) =>
  ApiClient.get("/admin/detailProduct/findAll", payload);

export const requestPutUpdateDetailProduct = (payload: UpdateDto) =>
  ApiClient.put("/admin/detailProduct/update", payload);

export const requestDeleteDetailProduct = (payload: DeleteInterface) =>
  ApiClient.delete("/admin/detailProduct/delete", { params: payload });

export const requestPostCreateDetailProduct = (payload: CreateDto) =>
  ApiClient.post("/admin/detailProduct/create", payload);

// interface product

export interface CreateProductDto {
  categoryId: number;
  description: string;
  image: string;
  materialProductIdList: number[];
  productName: string;
  tagProductIdList: number[];
}
export interface GetProductDto {
  page: number;
  limit: number;
}

// function product detail
export const requestGetProductAll = (payload: GetProductDto) =>
  ApiClient.get("/admin/product/findAllByPageble", payload);

export const requestPutUpdateProduct = (payload: UpdateDto) =>
  ApiClient.put("/admin/product/update", payload);

export const requestDeleteProduct = (payload?: any) =>
  ApiClient.delete("/admin/product/delete", { params: payload });

export const requestPostCreateProduct = (payload: CreateProductDto) =>
  ApiClient.post("/admin/product/createArrayOptionValueProduct", payload);
