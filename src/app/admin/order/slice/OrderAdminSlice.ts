import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LIST_BRANCH } from "../../../contant/ContaintDataAdmin";
import { Branch, DataState } from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";

const initialState: DataState<Branch[]> = {
  data: LIST_BRANCH,
  isError: false,
  isLoading: false,
};

export const incrementAsyncBranchAdmin = createAsyncThunk(
  "order/admin",
  async () => {
    // call api here
    return true;
  }
);

export const orderAdminSlice = createSlice({
  name: "order/admin",
  initialState,
  reducers: {
    updateBranch: (state, action) => {
      let oldArray = state.data;
      let item: Branch = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createBranch: (state, action) => {
      let item: Branch = action.payload?.item;
      state.data = [item].concat(state.data);
    },
    deleteBranch: (state, action) => {
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
      .addCase(incrementAsyncBranchAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncBranchAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(incrementAsyncBranchAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createBranch, updateBranch, deleteBranch } =
  orderAdminSlice.actions;
export default orderAdminSlice.reducer;
