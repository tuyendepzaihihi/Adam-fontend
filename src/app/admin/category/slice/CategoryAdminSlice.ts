import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LIST_CATEGORY } from "../../../contant/ContaintDataAdmin";
import { CategoryAdmin, DataState } from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";

const initialState: DataState<CategoryAdmin[]> = {
  data: LIST_CATEGORY,
  isError: false,
  isLoading: false,
};

export const incrementAsyncCategoryAdmin = createAsyncThunk(
  "category/admin",
  async () => {
    // call api here
    return true;
  }
);

export const categoryAdminSlice = createSlice({
  name: "category/admin",
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      let oldArray = state.data;
      let item: CategoryAdmin = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createCategory: (state, action) => {
      let item: CategoryAdmin = action.payload?.item;
      state.data = state.data?.concat([item]);
    },
    deleteCategory: (state, action) => {
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
      .addCase(incrementAsyncCategoryAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncCategoryAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(incrementAsyncCategoryAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createCategory, updateCategory, deleteCategory } =
  categoryAdminSlice.actions;
export default categoryAdminSlice.reducer;
