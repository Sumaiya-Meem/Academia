/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ContextProvider } from "../Context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(ContextProvider);
    const location=useLocation();

    if(loading){
        return <div className="flex justify-center items-center">Loading......</div>
    }
    if(user){
        return children;
    }
    
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivateRoute;