import { Navigate } from "react-router-dom";
import LoginScreen from "../app/auth/LoginScreen";
import RegisterScreen from "../app/auth/RegisterScreen";
import { ROUTE, ROUTE_ADMIN } from "../app/contant/Contant";
import HomeScreen from "../app/screen/home/HomeScreen";
import ProductScreen from "../app/screen/product/ProductScreen";
import EmailInputScreen from "../app/auth/EmailInputScreen";
import { getAdmin, getToken } from "../app/service/StorageService";
import ForgotPasswordScreen from "../app/auth/ForgotPasswordScreen";
import ProductDetailScreen from "../app/screen/product/ProductDetailScreen";
import CartScreen from "../app/screen/cart/CartScreen";
import AddressUser from "../app/screen/setting/address/AddressUser";

export const AUTH_ROUTE = [
  {
    route: ROUTE.LOGIN,
    screen: <LoginScreen />,
  },
  {
    route: ROUTE.REGISTER,
    screen: <RegisterScreen />,
  },
  {
    route: ROUTE.EMAIL_INPUT,
    screen: <EmailInputScreen />,
  },
  {
    route: ROUTE.FORGOT_PASS,
    screen: <ForgotPasswordScreen />,
  },
];

export const PRIVATE_ROUTE = [
  {
    route: ROUTE.HOME,
    screen: <HomeScreen />,
  },
  {
    route: ROUTE.PRODUCT,
    screen: <ProductScreen />,
  },
  {
    route: ROUTE.PRODUCT_DETAIL,
    screen: <ProductDetailScreen />,
  },
  {
    route: ROUTE.CART,
    screen: <CartScreen />,
  },
  {
    route: ROUTE.ADDRESS,
    screen: <AddressUser />,
  },
];

export function PrivateRoute(props: { children: any; isAdmin?: boolean }) {
  const { children } = props;
  const admin = getAdmin();
  return !admin ? children : <Navigate replace to={ROUTE_ADMIN.DASHBOARD} />;
}

export function AuthRoute(props: { children: any; isAdmin?: boolean }) {
  const { children } = props;
  const token = getToken();
  const admin = getAdmin();
  return !token ? (
    children
  ) : (
    <Navigate replace to={admin ? ROUTE_ADMIN.DASHBOARD : ROUTE.HOME} />
  );
}
