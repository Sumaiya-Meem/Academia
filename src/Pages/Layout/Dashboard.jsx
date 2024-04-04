import { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { CgProfile } from "react-icons/cg";
import { NavLink} from "react-router-dom";
import { FaHome} from "react-icons/fa";
import { ContextProvider } from "../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { ImProfile } from "react-icons/im";
import { GrTechnology } from "react-icons/gr";
import logo from "../../../public/logo.png"

const Dashboard = () => {
  const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosPublic();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = async () => {
      const res = await axiosSecure.get(`users/${user.email}`);
      const data = res.data;
    //   console.log(data);

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
        <div className="flex-1 pt-5 pb-3  px-2 mx-2">
                <img src={logo} alt=""  className='h-[100px] w-[100px] mx-auto'/>
        </div>
    {
       isAdmin ?

            <>
                
                <NavLink  to='/dashboard/adminHome'><div className='text-base items-center flex gap-1 py-2 lg:pl-10 md:pl-3 text-gray-200 border-y border-gray-600 capitalize font-semibold'><CgProfile /> Admin Home</div></NavLink>

                <NavLink  to='/dashboard/addTechnoloy'><div className='text-base items-center flex gap-1 py-2 lg:pl-10 md:pl-3 text-gray-200 border-y border-gray-600 capitalize font-semibold'><GrTechnology /> Add Technology</div></NavLink>
                
                <NavLink  to='/dashboard/adminProfile'><div className='text-base items-center flex gap-1 py-2 lg:pl-10 md:pl-3 text-gray-200 border-y border-gray-600 capitalize font-semibold'><ImProfile />Profile</div></NavLink>
                
                <NavLink to='/'><div className='text-base items-center flex gap-1 py-2 lg:pl-10 md:pl-3 text-gray-200 border-b border-gray-600 capitalize font-semibold'><FaHome /> Home</div></NavLink>
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
