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
import AllSuccessStudent from "../HomePage/SuccessStudent/AllSuccessStudent";
import AddInstuctor from "../DashboardPage/AdminPage/AddInstuctor/AddInstuctor";
import Payment from "../Payment/Payment";
import PrivateRoute from "./PrivateRoute";
import PaymentHistory from "../DashboardPage/UserPage/PaymentHistory";
import AllCourses from "../HomePage/PopularCourse/AllCourse/AllCourses";
import AllCartItem from "../AllCart/AllCartItem";
import UpdateProfile from "../DashboardPage/UpdateProfile/UpdateProfile";
import About from "../About/About";



  
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
          path: "/about",
          element:<About></About>,
        },
        {
          path: "/allCart",
          element:<AllCartItem></AllCartItem>,
        },
       {
        path:"/detailCourse/:id",
        element:<SingleCourse></SingleCourse>,
        // loader:({params})=>fetch(`https://school-sphere-server-side.vercel.app/course/${params.id}`)
        loader:({params})=>fetch(`https://school-sphere-server-side.vercel.app/course/${params.id}`)
       },
       {
        path: "/success-story",
        element:<AllSuccessStudent></AllSuccessStudent>, 
      },
      {
        path: "/allCourses",
        element:<AllCourses></AllCourses>, 
        loader:()=>fetch('https://school-sphere-server-side.vercel.app/courseCount')
      },
        {
          path: "/login",
          element: <Login></Login>, 
        },
        {
          path: "/registration",
          element: <Register></Register>, 
        },
         // payment
         {
          path:'make-payment',
          element:<PrivateRoute><Payment></Payment></PrivateRoute>
        }
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
          path: 'addInstuctor',
          element:<AddInstuctor></AddInstuctor>
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
        {
          path: 'updateUser/:id',
          element:<UpdateProfile></UpdateProfile>,
          loader:({params})=>fetch(`https://school-sphere-server-side.vercel.app/users/${params.id}`)
        },
        
      //  user 
      
      {
        path: 'payment-history',
        element:<PaymentHistory></PaymentHistory>
      },
    
    ]
  }
  ]);