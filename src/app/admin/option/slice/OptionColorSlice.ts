import { requestGetColorAll } from "./../OptionApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OPTIONS_DATA } from "../../../contant/ContaintDataAdmin";
import {
  DataState,
  OptionColor,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";

const initialState: DataState<OptionColor[]> = {
  data: OPTIONS_DATA.colors,
  isError: false,
  isLoading: false,
};

export const incrementAsyncOptionColor = createAsyncThunk(
  "option/Color",
  async () => {
    // call api here
    const res: ResultApi<OptionColor[]> = await requestGetColorAll();
    return res;
  }
);

export const optionColorSlice = createSlice({
  name: "option/Color",
  initialState,
  reducers: {
    updateColor: (state, action) => {
      let oldArray = state.data;
      let item: OptionColor = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createColor: (state, action) => {
      let item: OptionColor = action.payload?.item;
      state.data = state.data?.concat([item]);
    },
    deleteColor: (state, action) => {
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
      .addCase(incrementAsyncOptionColor.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncOptionColor.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(incrementAsyncOptionColor.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createColor, deleteColor, updateColor } =
  optionColorSlice.actions;
export default optionColorSlice.reducer;