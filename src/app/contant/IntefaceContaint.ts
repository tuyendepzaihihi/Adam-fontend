export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

export interface UserAdminInteface {
  id: any;
  email: string;
  phone: string;
  position: string;
  first_name: string;
  last_name: string;
  active: number;
}

export interface DataState<T> {
  data: T;
  isLoading?: boolean;
  isError?: boolean;
}

export interface CategoryAdmin {
  id: number;
  name: string;
  create_date: string;
  status: number;
  url: string;
}

export interface VoucherAdmin {
  id: number;
  title: string;
  description: string;
  status: number;
  url: string;
  startDate: any;
  endDate: any;
  create_date: any;
  discountMinValue: number;
  discountMaxValue: number;
  discountPersent: number;
}
