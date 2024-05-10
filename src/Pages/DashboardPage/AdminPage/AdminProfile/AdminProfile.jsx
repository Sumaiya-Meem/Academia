import { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { ContextProvider } from "../../../Context/AuthProvider";
import userImg from "../../../../../public/userimage.png";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { RiAdminFill } from "react-icons/ri";

const AdminProfile = () => {
    const { user } = useContext(ContextProvider);
    const axiosSecure = useAxiosPublic();
    const [users,setUsers]=useState({});

    useEffect(() => {
        const userData = async () => {
          const res = await axiosSecure.get(`users/${user.email}`);
          const data = res.data;
        //   console.log(data);
        setUsers(data);
        };
    
        if (user && user.email) {
          userData();
        }
      }, [axiosSecure, user]);

    return (
        <div>
            <div className='mt-12 mx-3 md:mx-0'>
                <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-lg">
                    <div className="relative">
                        <div className="bg-blue-950 ">
                            <h1 className="text-white ml-2 pt-2 text-xl font-[poppins]">My Profile</h1>
                            <img className='relative mx-auto top-12 border-4 border-gray-300 rounded-full w-32 h-32' src={userImg} alt="" />
                        </div>
                    </div>
                    <div className="pt-12 pb-5 px-5">
                        <h2 className="text-2xl font-bold mb-2 font-[poppins]">{users.name}</h2>
                        <div className="flex items-center mb-4">
                            <RiAdminFill className=" mr-2 text-xl" />
                            <h1 className="capitalize font-semibold font-[poppins]">{users.role}</h1>
                        </div>
                        
                      
                        <div className="flex items-center mb-4">
                            <FaEnvelope className=" mr-2" />
                            <p className="text-gray-700">{users.email}</p>
                        </div>
                        <div className="flex items-center">
                            <FaMapMarkerAlt className=" mr-2" />
                            <p className="text-gray-700">Barishal,Bangladesh</p>
                        </div>
                        <div className="flex justify-center mt-5">
                           <Link to={`updateUser/${users._id}`}>
                           <button className="bg-blue-800 px-2 py-1 text-white rounded-md font-semibold ">
                            Edit Profile</button>
                           </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;