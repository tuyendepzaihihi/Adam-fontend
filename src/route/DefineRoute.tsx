import { Navigate } from "react-router-dom";
import EmailInputScreen from "../app/auth/EmailInputScreen";
import ForgotPasswordScreen from "../app/auth/ForgotPasswordScreen";
import LoginScreen from "../app/auth/LoginScreen";
import PhoneVerifyScreen from "../app/auth/PhoneVerifyScreen";
import RegisterScreen from "../app/auth/RegisterScreen";
import { ROUTE, ROUTE_ADMIN } from "../app/contant/Contant";
import { getToken } from "../app/service/StorageService";

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
  {
    route: ROUTE.VERIFY_CODE,
    screen: <PhoneVerifyScreen />,
  },
];

export function AuthRoute(props: { children: any}) {
  const { children } = props;
  const token = getToken();
  return !token ? children : <Navigate replace to={ROUTE_ADMIN.DASHBOARD} />;
}
