import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataState, ResultApi } from "../../../contant/IntefaceContaint";
import { OrderDto } from "../../../screen/order/slice/OrderSlice";
import { createNotification } from "../../../utils/MessageUtil";
import { GetOrderAdminDto, requestGetOrderAdminAll } from "../OrderApi";

const initialState: DataState<OrderDto[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const incrementAsyncOrderAdminAdmin = createAsyncThunk(
  "order/admin",
  async (payload: GetOrderAdminDto) => {
    // call api here
    const res: ResultApi<{ content: OrderDto[]; totalPages: number }> =
      await requestGetOrderAdminAll(payload);
    return res;
  }
);

export const orderAdminSlice = createSlice({
  name: "order/admin",
  initialState,
  reducers: {
    updateOrderAdmin: (state, action) => {
      let oldArray = state.data;
      let item: OrderDto = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createOrderAdmin: (state, action) => {
      let item: OrderDto = action.payload?.item;
      state.data = [item].concat(state.data);
    },
    deleteOrderAdmin: (state, action) => {
      let array = state.data;
      let deleteArray: OrderDto[] = action.payload?.array;
      deleteArray.forEach((e: any) => {
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
      .addCase(incrementAsyncOrderAdminAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncOrderAdminAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data.content;
      })
      .addCase(incrementAsyncOrderAdminAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createOrderAdmin, updateOrderAdmin, deleteOrderAdmin } =
  orderAdminSlice.actions;
export default orderAdminSlice.reducer;
