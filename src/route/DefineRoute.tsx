import { Navigate } from "react-router-dom";
import LoginScreen from "../app/auth/LoginScreen";
import RegisterScreen from "../app/auth/RegisterScreen";
import { ROUTE, ROUTE_ADMIN } from "../app/contant/Contant";
import HomeScreen from "../app/screen/home/HomeScreen";
import ProductScreen from "../app/screen/product/ProductScreen";
import EmailInputScreen from "../app/auth/EmailInputScreen";
import { getToken } from "../app/service/StorageService";
import ForgotPasswordScreen from "../app/auth/ForgotPasswordScreen";
import ProductDetailScreen from "../app/screen/product/ProductDetailScreen";

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
];

export function PrivateRoute(props: { children: any }) {
  const { children } = props;
  return children;
}

export function AuthRoute(props: { children: any; isAdmin: boolean }) {
  const { children, isAdmin } = props;
  const token = getToken();
  return !token ? (
    children
  ) : (
    <Navigate replace to={isAdmin ? ROUTE_ADMIN.DASHBOARD : ROUTE.HOME} />
  );
}
