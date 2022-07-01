import User from "@material-ui/icons/AccountBalance";
import Product from "@material-ui/icons/Computer";
import Dashboard from "@material-ui/icons/Dashboard";

import {
  AccountBalance,
  BrandingWatermark,
  ColorLens,
  LocationCity,
  PermMediaOutlined,
  SettingsApplications,
  TagFaces,
} from "@material-ui/icons";
import CategoryIcon from "@material-ui/icons/Category";
import R from "../assets/R";
import { ItemProduct } from "../component/product_item/ProductItemComponent";
import { DataAddress } from "../screen/setting/address/slice/AddressSlice";
import { LIST_PRODUCT_DETAIL } from "./ContaintDataAdmin";
import { DetailProductAdmin } from "./IntefaceContaint";
export const BaseUrl = "http://localhost:3001/";
export const REG_EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
export const NAME_REGEX =
  /^[a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;

export const textValidate = {
  phone: {
    error_validate: "Phone number is error validate",
    require: "Please enter phone number",
  },
  pass: {
    require: "Please enter a password",
    short: "Pass word dont short more than 6 char",
    long: "Pass word dont long more than 25 char ",
  },
  re_pass: {
    not_found: "Confirm password incorrect",
    require: "Please enter confirm password",
  },
  full_name: {
    require: "Please enter a full name",
    error_validate: "Full name is error validate!",
  },
  company: {
    require: "Please enter a company",
  },
  email: {
    require: "Please enter a email!",
    error_validate: "Email is error validate!",
  },
};

export const ROUTE = {
  HOME: "/",
  PRODUCT: "/product",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASS: "/auth/forgotPassword",
  EMAIL_INPUT: "/auth/emailInput",
  PRODUCT_DETAIL: "/product/detail",
  CART: "/cart",
  ADDRESS: "/address",
  ORDER: "/order",
  ACCOUNT: "/account",
};

export const ROUTE_ADMIN = {
  DASHBOARD: "/DASHBOARD_ADMIN",
  USER: "/USER_AMDIN",
  PRODUCT: "/PRODUCT_ADMIN",
  ORDER: "/ORDER_ADMIN",
  SETTING: "/SETTING_ADMIN",
  CATEGORY: "/CATEGORY_ADMIN",
  MEDIA: "/MEDIA_ADMIN",
  VOUCHER: "/VOUCHER_ADMIN",
  TAG: "/TAG_AMDIN",
  BRANCH: "/BRANCH_ADMIN",
  MATERIAL: "/MATERIAL_ADMIN",
  OPTION: "/OPTION_ADMIN",
  COMMENT: "COMMENT_ADMIN",
};

export const LIST_MENU_DRAWER = [
  {
    name: "Dashboard",
    route: ROUTE_ADMIN.DASHBOARD,
    icon: Dashboard,
  },
  {
    name: "Quản lý sản phẩm",
    route: ROUTE_ADMIN.PRODUCT,
    icon: Product,
  },
  {
    name: "Quản lý người dùng",
    route: ROUTE_ADMIN.USER,
    icon: User,
  },
  {
    name: "Quản lý danh mục",
    route: ROUTE_ADMIN.CATEGORY,
    icon: CategoryIcon,
  },
  {
    name: "Quản lý khuyến mãi",
    route: ROUTE_ADMIN.VOUCHER,
    icon: PermMediaOutlined,
  },
  {
    name: "Quản lý chất liệu",
    route: ROUTE_ADMIN.MATERIAL,
    icon: PermMediaOutlined,
  },
  {
    name: "Quản lý Order",
    route: ROUTE_ADMIN.ORDER,
    icon: BrandingWatermark,
  },
  {
    name: "Quản lý Tag",
    route: ROUTE_ADMIN.TAG,
    icon: TagFaces,
  },
  {
    name: "Quản lý Option",
    route: ROUTE_ADMIN.OPTION,
    icon: ColorLens,
  },
];

export const TYPE_DIALOG = {
  CREATE: 1,
  UPDATE: 2,
};

export const LIST_IMAGE_BANNER = [
  {
    url: R.images.img_banner1,
    caption: "Slide 1",
  },
  {
    url: R.images.img_banner2,
    caption: "Slide 2",
  },
  {
    url: R.images.img_banner3,
    caption: "Slide 3",
  },
];
export const LIST_IMAGE_BANNER_SECOND = [
  {
    url: R.images.img_banner_second,
    caption: "Slide 1",
  },
  {
    url: R.images.img_banner_second1,
    caption: "Slide 2",
  },
];

export const LIST_PRODUCT = [
  {
    id: 0,
    name: "Áo sơ mi",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image: R.images.img_product,
  },
  {
    id: 1,
    name: "Áo sơ mi xấu tệ",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image: R.images.img_product,
  },
  {
    id: 2,
    name: "Áo sơ mi",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image: R.images.img_product,
  },
  {
    id: 3,
    name: "Áo sơ xấu đui",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image: R.images.img_product,
  },
  {
    id: 4,
    name: "Áo sơ mi thấp ",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image: R.images.img_product,
  },
  {
    id: 5,
    name: "Áo sơ mi ",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image: R.images.img_product,
  },
  {
    id: 6,
    name: "Áo sơ mi ",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image: R.images.img_product,
  },
  {
    id: 7,
    name: "Áo cổ cao ",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image: R.images.img_product,
  },
  // {
  //   id: 8,
  //   name: "Cổ cao ",
  //   price: 628000,
  //   discountPersent: 10,
  //   descriptionDiscount: "Giảm 10% cho sp thứ 2",
  //   url_image: R.images.img_product,
  // },
];
export interface ItemCart extends ItemProduct {
  totalPrice: number;
  count: number;
  product_id?: number;
}
export const LIST_CART: ItemCart[] = [
  {
    id: 100,
    name: "Áo sơ mi nam",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    totalPrice: 628000 * 2,
    count: 2,
    url_image: R.images.img_product,
    product_id: 7,
  },
  {
    id: 150,
    name: "Áo kẻ sọc đẹp",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    totalPrice: 628000 * 2,
    count: 2,
    url_image: R.images.img_product,
    product_id: 7,
  },
];

export interface Category {
  id: any;
  name: string;
}
export const LIST_CATEGORY: Category[] = [
  { id: 1, name: "Thu đông" },
  { id: 2, name: "Nam hàn" },
  { id: 3, name: "Nam trung" },
];

export const data_detail = {
  id: 1,
  options: [
    {
      id: 1,
      name: "Color",
      option_values: [
        {
          id: 1,
          name: "red",
        },
        {
          id: 2,
          name: "blue",
        },
      ],
    },
    {
      id: 2,
      name: "Size",
      option_values: [
        {
          id: 1,
          name: "X",
        },
        {
          id: 2,
          name: "M",
        },
      ],
    },
  ],
};
export const dataFilter: DetailProductAdmin[] = LIST_PRODUCT_DETAIL;

export const LIST_ADDRESS: DataAddress[] = [
  {
    id: 1,
    addressDetail: "khn",
    districtId: 1,
    districtName: "Nam từ liêm",
    isDefault: false,
    name: "Lê Văn Cử",
    phone: "0965259555",
    provinceId: 1,
    provinceName: "Ha noi",
    wardId: 1,
    wardName: "Mỹ Đình",
  },
];

export const TYPE_ACCOUNT = {
  PROFILE: "PROFILE",
  ADDRESS: "ADDRESS",
  ORDER: "ORDER",
  SETTING: "SETTING",
};

export const DEFINE_TYPE_ACCOUNT = {
  [TYPE_ACCOUNT.PROFILE]: {
    name: "Thông tin cá nhân",
    icon: AccountBalance,
    index: 0,
  },
  [TYPE_ACCOUNT.ADDRESS]: {
    name: "Địa chỉ nhận hàng",
    icon: LocationCity,
    index: 1,
  },

  [TYPE_ACCOUNT.ORDER]: {
    name: "Thông tin đơn hàng",
    icon: AccountBalance,
    index: 2,
  },
  [TYPE_ACCOUNT.SETTING]: {
    name: "Cài đặt",
    icon: SettingsApplications,
    index: 3,
  },
};
