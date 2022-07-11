import { ApiClient } from "../../service/ApiService";

// interface favorite
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  favoriteName: string;
  status: boolean;
}

export interface CreateDto {
  account_id: number;
  product_id: number;
}

// function favorite
export const requestGetFavoritesByAccount = (payload: { account_id: number }) =>
  ApiClient.get("/favorite/findProductFavoriteByAccountId", {
    params: payload,
  });

export const requestPutUpdateSize = (payload: UpdateDto) =>
  ApiClient.put("/favorite/update", payload);

export const requestDeleteSize = (payload: any) =>
  ApiClient.delete("/favorite/delete", { params: payload });

export const requestPostCreateSize = (payload: CreateDto) =>
  ApiClient.post("/favorite/create", { params: payload });
