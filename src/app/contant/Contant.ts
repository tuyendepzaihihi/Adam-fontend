import Product from "@material-ui/icons/Computer";
import Home from "@material-ui/icons/HomeSharp";
import { ItemProduct } from "../component/product_item/ProductItemComponent";

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
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASS: "/forgotPassword",
  EMAIL_INPUT: "/emailInput",
  PRODUCT_DETAIL: "/productDetail",
};

export const DEFINE_ROUTE = {
  [ROUTE.HOME]: {
    name: "Home",
    route: "/",
  },
  [ROUTE.PRODUCT]: {
    name: "Product",
    route: "/product",
  },
};

export const LIST_MENU_DRAWER = [
  {
    name: ROUTE.HOME,
    route: DEFINE_ROUTE[ROUTE.HOME].route,
    icon: Home,
  },
  {
    name: ROUTE.PRODUCT,
    route: DEFINE_ROUTE[ROUTE.PRODUCT].route,
    icon: Product,
  },
];

export const LIST_IMAGE_BANNER = [
  {
    url: "https://owen.vn/media/codazon/slideshow/l/_/l_1366_x_532_1_.jpg",
    caption: "Slide 1",
  },
  {
    url: "https://owen.vn/media/codazon/slideshow/1/3/1366_x_532_34_1_.jpg",
    caption: "Slide 2",
  },
  {
    url: "https://owen.vn/media/codazon/slideshow/1/3/1366_x_532_20_1__1.jpg",
    caption: "Slide 3",
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
}
export const LIST_CART = [
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
