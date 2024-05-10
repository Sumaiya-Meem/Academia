
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useCourse from "../../../../Hooks/useCourse";
import { PiStudentBold } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { CgDollar } from "react-icons/cg";

import  { useMemo } from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminHome = () => {
//   const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosPublic();
  const [courses]=useCourse();

  const { data: adminData = {} } = useQuery({
    queryKey: ['admin_profile-data'],
    queryFn: async () => {
        const res = await axiosSecure.get('/admin-profile-data')
        return res.data;
    }
})
console.log(adminData)

const dataForChart = useMemo(() => {
    const enrollmentByCategory = {};

    courses.forEach(course => {
      const category = course.category;
      const enrollments = parseInt(course.totalEnrollStudent, 10) || 0;  // Handle possible NaNs

      if (enrollmentByCategory[category]) {
        enrollmentByCategory[category] += enrollments;
      } else {
        enrollmentByCategory[category] = enrollments;
      }
    });

    return Object.keys(enrollmentByCategory).map(category => ({
      name: category,
      Course: enrollmentByCategory[category]
    }));
  }, [courses]);

  return (
    <div className="bg-gray-100">
      <div className=" ml-3">
        <div className="grid grid-cols-1 lg:grid-cols-3">
       
            <div className="bg-white w-[286px] h-[140px] mx-auto lg:mx-0 py-4 px-7 rounded-md mt-5 shadow-md  text-black">
              <h1 className="text-[#012970] font-[500] mb-3 text-xl font-serif">
                Total Students
              </h1>
              <div className="flex items-center gap-2">
               <div className="bg-blue-100 p-5 rounded-[50%]"><PiStudentBold className="text-3xl text-blue-500"></PiStudentBold></div>
               <p className="text-[28px] font-bold text-[#012970] ">{adminData?.totalStudents}</p>
                </div> 
              
            </div>
        
       
            <div className="bg-white w-[286px] h-[140px] py-4 px-7 mx-auto lg:mx-0  rounded-md mt-5 shadow-md  text-black">
              <h1 className="text-[#012970] font-[500] mb-3 text-xl font-serif">
                Total Courses
              </h1>
              <div className="flex items-center gap-2">
               <div className="bg-blue-100 p-5 rounded-[50%]"><IoBookOutline className="text-3xl text-blue-500"></IoBookOutline></div>
               <p className="text-[28px] font-bold text-[#012970] ">{adminData?.allCourse}</p>
                </div> 
             
            </div>
            <div className="bg-white w-[286px] h-[140px] py-4 px-7 mx-auto lg:mx-0  rounded-md mt-5 shadow-md  text-black">
              <h1 className="text-[#012970] font-[500] mb-3 text-xl font-serif">
                Fee Collection
              </h1>
              <div className="flex items-center gap-2">
               <div className="bg-blue-100 p-5 rounded-[50%]"><CgDollar className="text-3xl text-blue-500"></CgDollar></div>
               <p className="text-[28px] font-bold text-[#012970] ">{adminData?.totalPayments?.$numberDecimal}</p>
                </div> 
            
            </div>
     
        </div>

        <div className="mt-10" style={{ width: '80%', height: '300px' }}>
        {courses && courses.length > 0 ? (
            <ResponsiveContainer>
              <BarChart data={dataForChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis width={80} label={{ value: 'Total Students', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="bottom" wrapperStyle={{ lineHeight: '40px' }} />
                <Bar dataKey="Course" fill="#8884d8" barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available</p>
          )}
        </div>

       
      </div>
     
    </div>
  );
};

export default AdminHome;
