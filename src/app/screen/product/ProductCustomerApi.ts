import { ApiClient } from "../../service/ApiService";
// interface
export interface GetProductDto {
  size: number;
  page: number;
}

// function

export const requestGetCategorylAll = () =>
  ApiClient.get("/category/findAll", {});
export const requestGetCategorylAllByParentId = () =>
  ApiClient.get("/category/findAllCategoryParentId", {});
export const requestGetProductCustomer = (payload: GetProductDto) =>
  ApiClient.get("/product/findAllByPageble", { params: payload });
