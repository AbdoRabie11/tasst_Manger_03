import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AddTask from "./pages/AddTask";
import AllTasks from "./pages/AllTasks";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children: [
      {index:true, element:<Register />},
      {
        path:'/register',
        element:<Register />
      },
      {
        path:'/addTask',
        element:<AddTask />
      },
      {
        path:'/allTasks',
        element:<AllTasks />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer position='top-center' />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
