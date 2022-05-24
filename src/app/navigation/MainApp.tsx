import { Route, Routes } from "react-router-dom";
import {
  AuthRoute,
  AUTH_ROUTE,
  PrivateRoute,
  PRIVATE_ROUTE,
} from "../../route/DefineRoute";

const MainApp = () => {
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
      {AUTH_ROUTE.map((e) => {
        return (
          <Route path={e.route} element={<AuthRoute>{e.screen}</AuthRoute>} />
        );
      })}
    </Routes>
  );
};
export default MainApp;
