import { RouterProvider, createBrowserRouter } from "react-router-dom";

import authRoutes from "./auth";
import Home from "../pages/home";

const AppRoutes = () => {

  const router = createBrowserRouter([{
    path: '/',
    children: [
      ...authRoutes,
      {
        path: '',
        element: <Home />,
        // loader: tokenIsValid,
        children: [
          // ...allowedRoutes,
        ]
      },
    ]
  }]);

  return <RouterProvider router={router} />;

};

export default AppRoutes;
