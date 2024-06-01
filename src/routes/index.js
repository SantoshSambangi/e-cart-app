import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/login";
import Products from "../pages/products";
import Purchase from "../pages/purchase";
import SignUpPage from "../pages/signup";

const AppRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/products",
            element: <Products />,
        },
        {
            path: "/purchase",
            element: <Purchase />,
        },
        {
            path: "/signup",
            element: <SignUpPage />,
        },
    ]);
};

export default AppRoutes;
