import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../HomePage/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AdminHome from "../DashboardPage/AdminPage/AdminHome/AdminHome";
import LayoutDA from "../Layout/LayoutDA";
import AdminProfile from "../DashboardPage/AdminPage/AdminProfile/AdminProfile";
import AddTechnology from "../DashboardPage/AdminPage/AddTechnology/AddTechnology";
import CreativeCategory from "../DashboardPage/AdminPage/CreativeCategory/CreativeCategory";


  
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
        {
          path: 'adminProfile',
          element:<AdminProfile></AdminProfile>
        },
        {
          path: 'addTechnoloy',
          element:<AddTechnology></AddTechnology>
        },
        
        {
          path: 'addCreativeCatories',
          element:<CreativeCategory></CreativeCategory>
        },
        
        
    
    ]
  }
  ]);