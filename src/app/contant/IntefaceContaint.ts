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
  categoryName: string;
  create_date: string;
  isDeleted: boolean;
  url: string;
  categoryParentId: number;
  categoryChildren?: CategoryAdmin[] | null;
  isActive: boolean;
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
  materialName: string;
  isDelete: boolean;
}
export interface Tag {
  id: any;
  tagName: string;
  isDelete: boolean;
}
export interface Branch {
  id: any;
  branch_name: string;
  status: number;
}

export interface OptionColor {
  id: any;
  colorName: string;
  status: number;
}
export interface OptionSize {
  id: any;
  sizeName: string;
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
  data?: OptionColor[] | OptionSize[];
}

export interface ProductAdmin {
  productName: string;
  createDate: string;
  description: string;
  image: string;
  category_id: any;
  id: any;
  isActive: any;
  tag_id: any;
  voteAverage: number;
  category: CategoryAdmin;
}

export interface DetailProductAdmin {
  id: any;
  quantity: number;
  priceExport: number;
  priceImport: number;
  isDelete: any;
  productImage: any;
  product: ProductAdmin;
  color: OptionColor;
  size: OptionSize;
  isActive: boolean | null;
  createDate: string;
}

export interface OrderAdmin {
  id: number;
  account_id: number;
  status: number;
  create_date: string;
  sale_price: number;
  amount_price: number;
  total_price: number;
  phone_number: string;
  full_name: string;
}

export interface DetailOrderAdmin {
  id: number;
  quantity: number;
  price: number;
  isDelete: boolean;
  order_id: number;
  detail_product_id: number;
}

export interface HistoryOrder {
  id: number;
  update_time: string;
  description: string;
  status: number;
  order_id: number;
}

export interface ResultApi<T> {
  data: T;
  message: string;
  status: number;
}
