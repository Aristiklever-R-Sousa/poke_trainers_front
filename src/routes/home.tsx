import { RouteObject } from "react-router-dom";
import Home from "../pages/home";

const homeRoutes: RouteObject = {
  path: '',
  // loader: alredyLogged,
  element: <Home />,
};

export default homeRoutes;
