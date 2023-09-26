
import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import PageStyle from "./pages/Style";
import PageShop from "./pages/Shop";
import PageCategory from "./pages/Category";
import PageProduct from "./pages/Product";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/style",
        element: <PageStyle />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/shop",
        element: <PageShop />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/category",
        element: <PageCategory />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/product/:id",
        element: <PageProduct />,
        errorElement: <ErrorPage />,
    },
]);

export default router;