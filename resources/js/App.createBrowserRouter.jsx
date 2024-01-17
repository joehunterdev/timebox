import React, { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "@curi/react-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index";
import Header from "./Components/Layout/Header";
import BoxApp from "./Components/BoxApp";
import { checkAuthLoader, tokenLoader } from "./util/http-util";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BoxApp />,
        id: "home",
        loader: checkAuthLoader, // Assuming you want to check authentication before rendering this route
    },
    {
        path: "auth",
        element: <AuthenticationPage />,
        id: "auth",
    },
    {
        path: "register",
        element: <RegisterPage />,
        id: "register",
    },
    {
        path: "profile",
        element: <ProfilePage />,
        id: "profile",
        loader: checkAuthLoader, // Assuming you want to check authentication before rendering this route
    },
]);

const App = () => {
    return (
        <Provider store={store}>
            <Header />
            <RouterProvider router={router}>
                <Outlet />
            </RouterProvider>
        </Provider>
    );
};
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<App />);
