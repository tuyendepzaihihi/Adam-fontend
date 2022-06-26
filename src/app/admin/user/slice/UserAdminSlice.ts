import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rows_example_user } from "../../../contant/ContaintDataAdmin";
import {
  DataState,
  ResultApi,
  UserAdminInteface,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
import { requestGetUserAll } from "../UserApi";

const initialState: DataState<UserAdminInteface[]> = {
  data: rows_example_user,
  isError: false,
  isLoading: false,
};

export const incrementAsyncUserAdmin = createAsyncThunk(
  "user/admin",
  async () => {
    const res: ResultApi<any> = await requestGetUserAll();
    console.log({ res });

    return true;
  }
);

export const userAdminSlice = createSlice({
  name: "user/admin",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      let oldArray = state.data;
      let item: UserAdminInteface = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createUser: (state, action) => {
      let item: UserAdminInteface = action.payload?.item;
      state.data = [item].concat(state.data);
    },
    deleteUser: (state, action) => {
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
      .addCase(incrementAsyncUserAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncUserAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(incrementAsyncUserAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createUser, updateUser, deleteUser } = userAdminSlice.actions;
export default userAdminSlice.reducer;
