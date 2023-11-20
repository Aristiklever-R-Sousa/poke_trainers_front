import { RouteObject } from "react-router-dom";

import Login from "../pages/login";
import SignUp from "../pages/signup";

const loginRoute: RouteObject = {
  path: 'login',
  // loader: alredyLogged,
  element: <Login />,
};

const signUpRoute: RouteObject = {
  path: 'signup',
  // loader: alredyLogged,
  element: <SignUp />,
};

export default [
  loginRoute,
  signUpRoute
];
