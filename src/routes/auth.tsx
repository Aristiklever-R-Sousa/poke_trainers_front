import { RouteObject } from "react-router-dom";
import Login from "../pages/login";

const signRoute: RouteObject = {
  path: '/login',
  // loader: alredyLogged,
  element: <Login />
};

export default signRoute;
