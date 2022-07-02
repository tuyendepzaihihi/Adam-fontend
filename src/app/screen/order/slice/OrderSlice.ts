import { ResultApi } from "./../../../contant/IntefaceContaint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemCart, LIST_ADDRESS, LIST_CART } from "../../../contant/Contant";
import { DataState, VoucherAdmin } from "../../../contant/IntefaceContaint";
import { DataAddress } from "../../setting/address/slice/AddressSlice";
import { requestGetCartAll } from "../OrderApi";
import { getIdAccount } from "../../../service/StorageService";

export interface History {
  id: number;
  status: number;
  time: string;
}

export interface OrderDto {
  id: number;
  createDate: string;
  status: string;
  fullName: string;
  phoneNumber: string;
  amountPrice: number;
  salePrice: number;
  totalPrice: number;
  addressDetail: string;
  address: {
    id: number;
    addressDetail: string;
    isDeleted: boolean;
    createDate: string;
    province: DataAddress;
    district: DataAddress;
    ward: DataAddress;
    isActive: boolean;
  };
}
export interface DataOrder {
  id: number;
  create_date: string;
  totalPrice: number;
  address?: DataAddress | null;
  products?: ItemCart[] | null;
  voucher?: VoucherAdmin | null;
  status: number;
  totalProduct: number;
  totalDiscount: number;
  code?: string;
  history?: History[];
}

interface DataOrderList {
  pedding: DataState<OrderDto[]>;
  confirm: DataState<OrderDto[]>;
  delivery: DataState<OrderDto[]>;
  adrived: DataState<OrderDto[]>;
  done: DataState<OrderDto[]>;
  cancel: DataState<OrderDto[]>;
  roll_back: DataState<OrderDto[]>;
}

const LIST_ORDER_PENDING: OrderDto[] = [];

const initialState: DataOrderList = {
  pedding: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  adrived: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  cancel: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  confirm: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  delivery: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  done: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  roll_back: {
    data: [],
    isError: false,
    isLoading: false,
  },
};

export const getOrderInfo = createAsyncThunk("order", async () => {
  const idAccount = getIdAccount();
  const res: ResultApi<OrderDto[]> = await requestGetCartAll({
    account_id: Number(idAccount),
  });
  return res;
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {},
    createOrder: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfo.pending, (state, action) => {})
      .addCase(getOrderInfo.fulfilled, (state, action) => {})
      .addCase(getOrderInfo.rejected, (state, action) => {});
  },
});
export const { createOrder, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;
