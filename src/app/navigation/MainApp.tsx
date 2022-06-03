import { Route, Routes } from "react-router-dom";
import { PrivateRouteAdmin, PRIVATE_ROUTE_ADMIN } from "../../route/AdminRoute";
import {
  AuthRoute,
  AUTH_ROUTE,
  PrivateRoute,
  PRIVATE_ROUTE,
} from "../../route/DefineRoute";

const MainApp = (props: { isAdmin: boolean }) => {
  const { isAdmin } = props;
  return (
    <Routes>
      {PRIVATE_ROUTE.map((e, index) => {
        return (
          <Route
            path={e.route}
            element={<PrivateRoute isAdmin={isAdmin}>{e.screen}</PrivateRoute>}
            key={index}
          />
        );
      })}
      {AUTH_ROUTE.map((e, index) => {
        return (
          <Route
            path={e.route}
            element={<AuthRoute isAdmin={isAdmin}>{e.screen}</AuthRoute>}
            key={index}
          />
        );
      })}
      {PRIVATE_ROUTE_ADMIN.map((e, index) => {
        return (
          <Route
            path={e.route}
            element={
              <PrivateRouteAdmin isAdmin={isAdmin}>
                {e.screen}
              </PrivateRouteAdmin>
            }
            key={index}
          />
        );
      })}
    </Routes>
  );
};
export default MainApp;
