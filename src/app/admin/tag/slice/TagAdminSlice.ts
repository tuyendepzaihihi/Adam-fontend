import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LIST_TAG } from "../../../contant/ContaintDataAdmin";
import { DataState, Tag } from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";

const initialState: DataState<Tag[]> = {
  data: LIST_TAG,
  isError: false,
  isLoading: false,
};

export const incrementAsyncTagAdmin = createAsyncThunk(
  "tag/admin",
  async () => {
    // call api here
    return true;
  }
);

export const tagAdminSlice = createSlice({
  name: "tag/admin",
  initialState,
  reducers: {
    updateTag: (state, action) => {
      let oldArray = state.data;
      let item: Tag = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createTag: (state, action) => {
      let item: Tag = action.payload?.item;
      state.data = state.data?.concat([item]);
    },
    deleteTag: (state, action) => {
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
      .addCase(incrementAsyncTagAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncTagAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(incrementAsyncTagAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createTag, updateTag, deleteTag } = tagAdminSlice.actions;
export default tagAdminSlice.reducer;
