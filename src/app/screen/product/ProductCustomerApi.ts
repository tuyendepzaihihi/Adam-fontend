import { ApiClient } from "../../service/ApiService";
// function
export const requestGetCategorylAll = () =>
  ApiClient.get("/category/findAll", {});
export const requestGetCategorylAllByParentId = () =>
  ApiClient.get("/category/findAllCategoryParentId", {});
