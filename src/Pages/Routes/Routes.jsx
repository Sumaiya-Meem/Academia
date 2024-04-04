import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../HomePage/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AdminHome from "../DashboardPage/AdminPage/AdminHome/AdminHome";
import LayoutDA from "../Layout/LayoutDA";


  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element:<Home></Home>,
        },
       
        {
          path: "/login",
          element: <Login></Login>, 
        },
        {
          path: "/registration",
          element: <Register></Register>, 
        },
      ],
    },
    {
      path: 'dashboard',
      element: <LayoutDA></LayoutDA>,
      children: [
  
        {
          path: 'adminHome',
          element:<AdminHome></AdminHome>
        },
    
    ]
  }
  ]);