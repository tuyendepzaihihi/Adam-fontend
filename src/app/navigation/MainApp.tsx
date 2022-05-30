import { Route, Routes } from "react-router-dom";
import { PRIVATE_ROUTE_ADMIN } from "../../route/AdminRoute";
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
      {PRIVATE_ROUTE.map((e) => {
        return (
          <Route
            path={e.route}
            element={<PrivateRoute>{e.screen}</PrivateRoute>}
          />
        );
      })}
      {!isAdmin &&
        AUTH_ROUTE.map((e) => {
          return (
            <Route path={e.route} element={<AuthRoute>{e.screen}</AuthRoute>} />
          );
        })}
      {isAdmin &&
        PRIVATE_ROUTE_ADMIN.map((e) => {
          return (
            <Route
              path={e.route}
              element={<PrivateRoute>{e.screen}</PrivateRoute>}
            />
          );
        })}
    </Routes>
  );
};
export default MainApp;
