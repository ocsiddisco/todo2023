import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./routes/Register";
import SignIn from "./routes/SignIn";
import ListTodos from "./routes/ListTodos";
import Logout from "./routes/Logout";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
import Layout from "./components/Layout";

import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signin",
        element: <SignIn />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/logout",
        element: <Logout />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/todos",
        element: <ListTodos />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
