import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LIST_MATERIAL } from "../../../contant/ContaintDataAdmin";
import { DataState, Material } from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";

const initialState: DataState<Material[]> = {
  data: LIST_MATERIAL,
  isError: false,
  isLoading: false,
};

export const incrementAsyncMaterialAdmin = createAsyncThunk(
  "material/admin",
  async () => {
    // call api here
    return true;
  }
);

export const materialAdminSlice = createSlice({
  name: "material/admin",
  initialState,
  reducers: {
    updateMaterial: (state, action) => {
      let oldArray = state.data;
      let item: Material = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createMaterial: (state, action) => {
      let item: Material = action.payload?.item;
      state.data = state.data?.concat([item]);
    },
    deleteMaterial: (state, action) => {
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
      .addCase(incrementAsyncMaterialAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncMaterialAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = [];
      })
      .addCase(incrementAsyncMaterialAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createMaterial, updateMaterial, deleteMaterial } =
  materialAdminSlice.actions;
export default materialAdminSlice.reducer;