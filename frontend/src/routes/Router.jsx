
import { createBrowserRouter } from "react-router-dom";

import App from "../App";

// Pages


// Routes
import PublicRoute from "../routes/PublicRoute";
import ProtectedRoute from "../routes/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import DashBoard from "../pages/dashBoard/DashBoard";
import Signup from "../pages/Signup"
import Login from "../pages/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      // PUBLIC ROUTES
      {
        element: <PublicRoute />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
        ],
      },

      // PROTECTED ROUTES
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard/*",
            element: <DashBoard />,
          },
        ],
      },

    ],
  },
]);

export default router;


