import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useCourse from "../../../../Hooks/useCourse";
import { PiStudentBold } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { CgDollar } from "react-icons/cg";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useInstructor from "../../../../Hooks/useInstructor";
import { IoMdStar } from "react-icons/io";

import { Table } from "flowbite-react";

const AdminHome = () => {
  //   const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosPublic();
  const [courses] = useCourse();
  const [instructors] = useInstructor();

  const { data: adminData = {} } = useQuery({
    queryKey: ["admin_profile-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-profile-data");
      return res.data;
    },
  });
  console.log(adminData);

  const dataForChart = useMemo(() => {
    const enrollmentByCategory = {};

    courses.forEach((course) => {
      const category = course.category;
      const enrollments = parseInt(course.totalEnrollStudent, 10) || 0; // Handle possible NaNs

      if (enrollmentByCategory[category]) {
        enrollmentByCategory[category] += enrollments;
      } else {
        enrollmentByCategory[category] = enrollments;
      }
    });

    return Object.keys(enrollmentByCategory).map((category) => ({
      name: category,
      Course: enrollmentByCategory[category],
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
              <div className="bg-blue-100 p-5 rounded-[50%]">
                <PiStudentBold className="text-3xl text-blue-500"></PiStudentBold>
              </div>
              <p className="text-[28px] font-bold text-[#012970] ">
                {adminData?.totalStudents}
              </p>
            </div>
          </div>

          <div className="bg-white w-[286px] h-[140px] py-4 px-7 mx-auto lg:mx-0  rounded-md mt-5 shadow-md  text-black">
            <h1 className="text-[#012970] font-[500] mb-3 text-xl font-serif">
              Total Courses
            </h1>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-5 rounded-[50%]">
                <IoBookOutline className="text-3xl text-blue-500"></IoBookOutline>
              </div>
              <p className="text-[28px] font-bold text-[#012970] ">
                {adminData?.allCourse}
              </p>
            </div>
          </div>
          <div className="bg-white w-[286px] h-[140px] py-4 px-7 mx-auto lg:mx-0  rounded-md mt-5 shadow-md  text-black">
            <h1 className="text-[#012970] font-[500] mb-3 text-xl font-serif">
              Fee Collection
            </h1>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-5 rounded-[50%]">
                <CgDollar className="text-3xl text-blue-500"></CgDollar>
              </div>
              <p className="text-[28px] font-bold text-[#012970] ">
                {adminData?.totalPayments?.$numberDecimal}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10" style={{ width: "80%", height: "300px" }}>
          {courses && courses.length > 0 ? (
            <ResponsiveContainer>
              <BarChart data={dataForChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  width={80}
                  label={{
                    value: "Total Students",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ lineHeight: "40px" }}
                />
                <Bar dataKey="Course" fill="#8884d8" barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="mt-5 flex flex-col lg:flex-row gap-4 lg:gap-0">
          <div className="w-[98%] lg:w-[30%] bg-white mr-2">
            <h1 className="text-xl font-bold mt-1 ml-2 font-[poppins]">
              Professors List
            </h1>
            <div className="h-[1px] bg-gray-100"></div>
            <div>
              {instructors.map((data, index) => (
                <div key={index} className="my-3 ml-1">
                  <div className="flex items-center gap-4 border-b">
                    <img
                      src={data.instructorPhoto}
                      alt=""
                      className="w-[50px] h-[50px] rounded-[50%]"
                    />
                    <div className="flex flex-col">
                      <div className="flex gap-7 ">
                        <div className="font-medium flex gap-2">
                          <h1>{data.name}</h1>

                          <div className="flex items-center gap-1">
                            {/* <FaBookOpen className="mt-"></FaBookOpen> */}
                            (<span className="font-medium ">{data.totalEnrollCourse}</span> course)
                          </div>
                        </div>
                        </div>
                        <div className="">
                          <div className="flex items-center gap-1">
                            <IoMdStar className="text-orange-800"></IoMdStar>
                            <h1>{data.totalreview}</h1>
                          </div>
                        </div>
                      </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[100%] lg:w-[70%] bg-white">
          <h1 className="text-xl font-bold mt-1 ml-2 font-[poppins]">
              Students List
            </h1>
            <div className="h-[1px] bg-gray-100"></div>
            <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Student name</Table.HeadCell>
          <Table.HeadCell>Course</Table.HeadCell>
          <Table.HeadCell>Instructor</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-black">
              Jannat
            </Table.Cell>
            <Table.Cell className=" text-black">Python Advance Bootcamp</Table.Cell>
            <Table.Cell className=" text-black">Emily Chen</Table.Cell>
            <Table.Cell className=" text-black">5 May 2024</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-black">
              Rima
            </Table.Cell>
            <Table.Cell className=" text-black">React redux</Table.Cell>
            <Table.Cell className=" text-black">Faysal Rahman</Table.Cell>
            <Table.Cell className=" text-black">12 March 2024</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-black">
              Sakib
            </Table.Cell>
            <Table.Cell className=" text-black">C++ 100Days Bootcamp</Table.Cell>
            <Table.Cell className=" text-black">Nayeem Hossain</Table.Cell>
            <Table.Cell className=" text-black">1 March 2024</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-black">
              Munna
            </Table.Cell>
            <Table.Cell className=" text-black">Python Programming Materclass</Table.Cell>
            <Table.Cell className=" text-black">Sarah Johson</Table.Cell>
            <Table.Cell className=" text-black">28 February 2024</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>

        </Table.Body>
      </Table>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
