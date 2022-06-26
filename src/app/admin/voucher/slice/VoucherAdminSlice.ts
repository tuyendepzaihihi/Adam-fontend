import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LIST_VOUCHER } from "../../../contant/ContaintDataAdmin";
import { DataState, VoucherAdmin } from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";

const initialState: DataState<VoucherAdmin[]> = {
  data: LIST_VOUCHER,
  isError: false,
  isLoading: false,
};

export const incrementAsyncVoucherAdmin = createAsyncThunk(
  "voucher/admin",
  async () => {
    // call api here
    return true;
  }
);

export const voucherAdminSlice = createSlice({
  name: "voucher/admin",
  initialState,
  reducers: {
    updateVoucher: (state, action) => {
      let oldArray = state.data;
      let item: VoucherAdmin = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createVoucher: (state, action) => {
      let item: VoucherAdmin = action.payload?.item;
      state.data = [item].concat(state.data);
    },
    deleteVoucher: (state, action) => {
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
      .addCase(incrementAsyncVoucherAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncVoucherAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(incrementAsyncVoucherAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createVoucher, updateVoucher, deleteVoucher } =
  voucherAdminSlice.actions;
export default voucherAdminSlice.reducer;
