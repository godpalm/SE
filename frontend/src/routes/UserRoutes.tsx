import { lazy } from "react";

import { RouteObject } from "react-router-dom";

import Loadable from "../components/third-party/Loadable";

import UserLayout from "../layout/UserLayout";


const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));

const Dashboard = Loadable(lazy(() => import("../pages/customer/palm/dashboard")));

const Customer = Loadable(lazy(() => import("../pages/customer/palm/customer")));

const CreateCustomer = Loadable(lazy(() => import("../pages/customer/palm/customer/create")));

const EditCustomer = Loadable(lazy(() => import("../pages/customer/palm/customer/edit")));


const UserRoutes = (isLoggedIn: boolean): RouteObject => {
    return {
      path: "/",
      element: isLoggedIn ? <UserLayout /> : <MainPages />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/customer",
          children: [
            {
              path: "/customer",
              element: <Customer />,
            },
            {
              path: "/customer/create",
              element: <CreateCustomer />,
            },
            {
              path: "/customer/edit/:id",
              element: <EditCustomer />,
            },
          ],
        },
      ],
    };
  };
  


export default UserRoutes;