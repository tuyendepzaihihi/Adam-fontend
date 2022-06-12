import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OPTIONS_DATA } from "../../../contant/ContaintDataAdmin";
import {
  DataState,
  DataStateOption,
  OptionColor,
  OptionSize,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";

const initialState: DataState<DataStateOption> = {
  data: OPTIONS_DATA,
  isError: false,
  isLoading: false,
};

export const incrementAsyncOptionAdmin = createAsyncThunk(
  "option/admin",
  async () => {
    // call api here
    return true;
  }
);

export const optionAdminSlice = createSlice({
  name: "option/admin",
  initialState,
  reducers: {
    updateColor: (state, action) => {
      let oldArray = state.data.colors;
      let item: OptionColor = action.payload?.item;
      state.data.colors = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createColor: (state, action) => {
      let item: OptionColor = action.payload?.item;
      state.data.colors = state.data.colors?.concat([item]);
    },
    deleteColor: (state, action) => {
      let array = state.data.colors;
      let deleteArray = action.payload?.array;
      deleteArray.map((e: any) => {
        array = array.filter((v) => e !== `${v.id}`);
      });
      state.data.colors = array;
      createNotification({
        type: "success",
        message: "Xoá thành công",
      });
    },
    updateSize: (state, action) => {
      let oldArray = state.data.sizes;
      let item: OptionSize = action.payload?.item;
      state.data.sizes = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createSize: (state, action) => {
      let item: OptionSize = action.payload?.item;
      state.data.sizes = state.data.sizes.concat([item]);
    },
    deleteSize: (state, action) => {
      let array = state.data.sizes;
      let deleteArray = action.payload?.array;
      deleteArray.map((e: any) => {
        array = array.filter((v) => e !== `${v.id}`);
      });
      state.data.sizes = array;
      createNotification({
        type: "success",
        message: "Xoá thành công",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncOptionAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncOptionAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(incrementAsyncOptionAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {
  createColor,
  createSize,
  deleteColor,
  deleteSize,
  updateColor,
  updateSize,
} = optionAdminSlice.actions;
export default optionAdminSlice.reducer;
