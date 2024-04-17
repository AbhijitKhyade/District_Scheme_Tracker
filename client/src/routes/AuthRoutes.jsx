import AuthLayout from "../layouts/AuthLayout";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/ResetPassword";

export const AuthRoutes = {
    path: "auth/",
    element: <AuthLayout />,
    children: [
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "register",
            element: <Register />,
        },
        {
            path: "forgot-password",
            element: <ForgotPassword />,
        },
        {
            path: "reset-password",
            element: <ResetPassword />,
        },
    ],
};