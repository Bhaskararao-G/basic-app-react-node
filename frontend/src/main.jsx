import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import router from "./routes/Router.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
      newestOnTop
      closeOnClick
      pauseOnHover
    />
    <RouterProvider router={router}/>
    <App/>
  </StrictMode>,
);
