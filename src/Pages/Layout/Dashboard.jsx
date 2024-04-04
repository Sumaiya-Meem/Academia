import { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { CgProfile } from "react-icons/cg";
import { NavLink} from "react-router-dom";
import { FaHome} from "react-icons/fa";
import { ContextProvider } from "../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Dashboard = () => {
  const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosPublic();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = async () => {
      const res = await axiosSecure.get(`users/${user.email}`);
      const data = res.data;
      console.log(data);

      if (data.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    if (user && user.email) {
      userData();
    }
  }, [axiosSecure, user]);

  return (
    <div  className="lg:min-h-screen h-full  bg-blue-950">
    {
       isAdmin ?

            <>
                
                <NavLink  to='/dashboard/adminHome'><div className='text-base items-center flex gap-1 py-2 lg:pl-10 md:pl-3 text-gray-200 border-y border-gray-600 uppercase font-semibold'><CgProfile /> Admin Home</div></NavLink>
                
                <NavLink  to='/dashboard/adminProfile'><div className='text-base items-center flex gap-1 py-2 lg:pl-10 md:pl-3 text-gray-200 border-y border-gray-600 uppercase font-semibold'><CgProfile />Profile</div></NavLink>
                
                <NavLink to='/'><div className='text-base items-center flex gap-1 py-2 lg:pl-10 md:pl-3 text-gray-200 border-b border-gray-600 uppercase font-semibold'><FaHome /> Home</div></NavLink>
            </>


            :

                <>
                  
                    <NavLink to='/'><div className='text-base items-center flex gap-1 py-2 lg:pl-10 md:pl-3 text-gray-200 border-b border-gray-600 uppercase font-semibold'><FaHome /> Home</div></NavLink>
                </>


              

    }
    




</div>
  );
};

export default Dashboard;
