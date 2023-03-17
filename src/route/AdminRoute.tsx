import { Navigate } from "react-router";
import DashboardScreen from "../app/admin/dashboard/DashboardScreen";
import UserScreen from "../app/admin/user/UserScreen";
import { ROUTE, ROUTE_ADMIN } from "../app/contant/Contant";
import { getToken } from "../app/service/StorageService";

export const PRIVATE_ROUTE_ADMIN = [
  {
    route: ROUTE_ADMIN.DASHBOARD,
    screen: <DashboardScreen />,
  },
  {
    route: ROUTE_ADMIN.USER,
    screen: <UserScreen />,
  },
];

export function PrivateRouteAdmin(props: { children: any}) {
  const { children } = props;
  const token = getToken();
  return token ? children : <Navigate replace to={ROUTE.LOGIN} />;
}
