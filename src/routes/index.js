import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/login";
import Products from "../pages/products";
import Purchase from "../pages/purchase";

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
    ]);
};

export default AppRoutes;
