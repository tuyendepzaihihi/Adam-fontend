import Product from "@material-ui/icons/Computer";
import Dashboard from "@material-ui/icons/Dashboard";
import User from "@material-ui/icons/AccountBalance";

import R from "../assets/R";
import { ItemProduct } from "../component/product_item/ProductItemComponent";
import { Category, PermMediaOutlined } from "@material-ui/icons";

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
  CART: "cart",
};

export const ROUTE_ADMIN = {
  DASHBOARD: "/DASHBOARD_ADMIN",
  USER: "/USER_AMDIN",
  PRODUCT: "/PRODUCT_ADMIN",
  ORDER: "/ORDER_ADMIN",
  SETTING: "/SETTING_ADMIN",
  CATEGORY: "/CATEGORY_ADMIN",
  MEDIA: "/MEDIA_ADMIN",
};

export const LIST_MENU_DRAWER = [
  {
    name: "Dashboard",
    route: ROUTE_ADMIN.DASHBOARD,
    icon: Dashboard,
  },
  {
    name: "Product",
    route: ROUTE_ADMIN.PRODUCT,
    icon: Product,
  },
  {
    name: "User",
    route: ROUTE_ADMIN.USER,
    icon: User,
  },
  {
    name: "Category",
    route: ROUTE_ADMIN.CATEGORY,
    icon: Category,
  },
  {
    name: "Media",
    route: ROUTE_ADMIN.MEDIA,
    icon: PermMediaOutlined,
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
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
  },
  {
    id: 1,
    name: "Áo sơ mi",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
  },
  {
    id: 2,
    name: "Áo sơ mi",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
  },
  {
    id: 3,
    name: "Áo sơ mi",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
  },
  {
    id: 4,
    name: "Áo sơ mi ",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
  },
  {
    id: 5,
    name: "Áo sơ mi ",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
  },
  {
    id: 6,
    name: "Áo sơ mi ",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
  },
  {
    id: 7,
    name: "Áo sơ mi ",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
  },
];
export interface ItemCart extends ItemProduct {
  totalPrice: number;
  count: number;
  product_id?: number;
}
export const LIST_CART: ItemCart[] = [
  {
    id: 0,
    name: "Áo sơ mi",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    totalPrice: 628000 * 2,
    count: 2,
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
    product_id: 7,
  },
  {
    id: 1,
    name: "Áo sơ mi",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    totalPrice: 628000 * 2,
    count: 2,
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
    product_id: 5,
  },
  {
    id: 2,
    name: "Áo sơ mi",
    price: 628000,
    discountPersent: 10,
    descriptionDiscount: "Giảm 10% cho sp thứ 2",
    totalPrice: 628000 * 2,
    count: 2,
    url_image:
      "https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/a/ba220409nt.jpg",
    product_id: 2,
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
export const dataFilter = {
  data: [
    {
      id: 1,
      url: R.images.img_product,
      price: 450000,
      option: [
        {
          id: 1,
          name: "Color",
          option_values: {
            id: 1,
            name: "red",
          },
        },
        {
          id: 2,
          name: "Size",
          option_values: {
            id: 1,
            name: "X",
          },
        },
      ],
    },
    {
      id: 2,
      url: R.images.img_product,
      price: 6500000,
      option: [
        {
          id: 1,
          name: "Color",
          option_values: {
            id: 1,
            name: "red",
          },
        },
        {
          id: 2,
          name: "Size",
          option_values: {
            id: 2,
            name: "L",
          },
        },
      ],
    },
    {
      id: 3,
      url: R.images.img_product,
      price: 500000,
      option: [
        {
          id: 1,
          name: "Color",
          option_values: {
            id: 2,
            name: "blue",
          },
        },
        {
          id: 2,
          name: "Size",
          option_values: {
            id: 1,
            name: "X",
          },
        },
      ],
    },
    {
      id: 4,
      url: R.images.img_product,
      price: 500000,
      option: [
        {
          id: 1,
          name: "Color",
          option_values: {
            id: 2,
            name: "blue",
          },
        },
        {
          id: 2,
          name: "Size",
          option_values: {
            id: 2,
            name: "L",
          },
        },
      ],
    },
  ],
};
