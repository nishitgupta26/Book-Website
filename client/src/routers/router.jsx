import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import { DashboardLayout } from "../Dashboard/DashboardLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Login from "../pages/Login";
import UploadBook from "../Dashboard/UploadBook";
import ManageBooks from "../Dashboard/ManageBooks";
import EditBooks from "../Dashboard/EditBooks";
import ErrorPage from "../pages/shared/ErrorPage";
import About from "../pages/about/About";
import Blog from "../pages/blog/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/blog",
        element: <Blog/>
      }
    ]
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/admin/dashboard", element: <PrivateRoute><ManageBooks></ManageBooks></PrivateRoute>},
      { path: "/admin/dashboard/upload", element:  <PrivateRoute><UploadBook /></PrivateRoute> },
      { path: "/admin/dashboard/manage", element: <PrivateRoute><ManageBooks /></PrivateRoute> },
      { path: "/admin/dashboard/edit-books/:id", element: <PrivateRoute><EditBooks /></PrivateRoute>,
      loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/book/${params.id}`)
    },
    ],
  },
  {
    path: "login",
    element: <Login />
  }
]);

export default router;