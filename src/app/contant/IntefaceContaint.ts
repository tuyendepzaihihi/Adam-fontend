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

export interface AddressOrderInterface {
  ward: {
    id: any;
    name: string;
  };
  province: {
    id: any;
    name: string;
  };
  district: {
    id: any;
    name: string;
  };
  detail: string;
}

export interface Material {
  id: any;
  material_name: string;
  status: number;
}
export interface Tag {
  id: any;
  tag_name: string;
  status: number;
}
export interface Branch {
  id: any;
  branch_name: string;
  status: number;
}

export interface OptionColor {
  id: any;
  color_name: string;
  status: number;
}
export interface OptionSize {
  id: any;
  size_name: string;
  status: number;
}

export interface DataStateOption {
  colors: OptionColor[];
  sizes: OptionSize[];
}

export interface Option extends DataStateOption {
  id: any;
  option_name: string;
  status: number;
  data: OptionColor[] | OptionSize[];
}
