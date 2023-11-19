import { RouterProvider, createBrowserRouter } from "react-router-dom";
import signRoute from "./auth";

const AppRoutes = () => {

  const router = createBrowserRouter([{
    path: '/',
    children: [
      signRoute,
      {
        // element: <Layout />,
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
