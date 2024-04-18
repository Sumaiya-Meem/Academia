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
import ErrorPage from "../Errorpage/ErrorPage";
import AddCourse from "../DashboardPage/AdminPage/AddCourse/AddCourse";
import SingleCourse from "../HomePage/PopularCourse/SingleCourse/SingleCourse";
import MakeAnnounce from "../DashboardPage/AdminPage/MakeAnnounce/MakeAnnounce";



  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element:<Home></Home>,
        },
       {
        path:"/detailCourse/:id",
        element:<SingleCourse></SingleCourse>,
        loader:({params})=>fetch(`http://localhost:5000/course/${params.id}`)
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
          path: 'popularCourse',
          element:<AddCourse></AddCourse>
        },
        {
          path: 'addTechnoloy',
          element:<AddTechnology></AddTechnology>
        },
        
        {
          path: 'addCreativeCatories',
          element:<CreativeCategory></CreativeCategory>
        },
        {
          path: 'makeAnnounce',
          element:<MakeAnnounce></MakeAnnounce>
        },
        
        
    
    ]
  }
  ]);