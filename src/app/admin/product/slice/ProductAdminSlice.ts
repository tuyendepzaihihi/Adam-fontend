import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LIST_PRODUCT } from "../../../contant/ContaintDataAdmin";
import {
  DataState,
  ProductAdmin,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
import { GetProductDto, requestGetProductAll } from "../ProductAdminApi";

const initialState: DataState<ProductAdmin[]> = {
  data: LIST_PRODUCT,
  isError: false,
  isLoading: false,
};

export const incrementAsyncProductAdmin = createAsyncThunk(
  "product/admin",
  async (payload: GetProductDto) => {
    const res: ResultApi<ProductAdmin[]> = await requestGetProductAll(payload);
    return res.data;
  }
);

export const productAdminSlice = createSlice({
  name: "product/admin",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      let oldArray = state.data;
      let item: ProductAdmin = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createProduct: (state, action) => {
      let item: ProductAdmin = action.payload?.item;
      state.data = state.data?.concat([item]);
    },
    deleteProduct: (state, action) => {
      let array = state.data;
      let deleteArray = action.payload?.array;
      deleteArray.map((e: any) => {
        array = array.filter((v) => e !== `${v.id}`);
      });
      state.data = array;
      createNotification({
        type: "success",
        message: "Xoá thành công",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncProductAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncProductAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(incrementAsyncProductAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createProduct, updateProduct, deleteProduct } =
  productAdminSlice.actions;
export default productAdminSlice.reducer;
