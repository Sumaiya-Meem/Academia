import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../HomePage/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";


  
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
   
  ]);