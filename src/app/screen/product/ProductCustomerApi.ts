import { ApiClient } from "../../service/ApiService";
// interface
export interface GetProductDto {
  size: number;
  page: number;
}

export interface ProductDetailByIdProduct {
  product_id: number;
}

// function

export const requestGetCategorylAll = () =>
  ApiClient.get("/category/findAll", {});
export const requestGetCategorylAllByParentId = () =>
  ApiClient.get("/category/findAllCategoryParentId", {});
export const requestGetProductCustomer = (payload: GetProductDto) =>
  ApiClient.get("/product/findAllByPageble", { params: payload });

export const requestGetProductCustomerById = (payload: { id: number }) =>
  ApiClient.get("/product/findOptionProductById", { params: payload });
export const requestGetProductDetailByIdProduct = (
  payload: ProductDetailByIdProduct
) => ApiClient.get("/productDetail/findByProductId", { params: payload });
