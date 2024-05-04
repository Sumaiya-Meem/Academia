import { Link } from "react-router-dom";
import useCourse from "../../../Hooks/useCourse";
import Loading from "../../Loading/Loading";
import "./PopularCourse.css";
import { IoMdStar } from "react-icons/io";


const PopularCourse = () => {
  const [courses]= useCourse();
  console.log(courses)

  if (!courses) {
    return <Loading></Loading>;
  }
  return (
    <div className="my-10 mx-5">
      {/* title section */}
      <div className="flex flex-col lg:flex-row items-center mb-16">
        <div className="w-[400px] flex gap-7 mb-7 lg:mb-0">
          <div>
            <h1 className="text-xl font-semibold">Top Categories</h1>
            <h1 className="text-[40px] font-bold font-[Poppins]">
              Popular Courses
            </h1>
          </div>
          <div className="bg-orange-400 w-[2px] hidden lg:block"></div>
        </div>
        <div className="flex items-center justify-between flex-col gap-2 lg:flex-row flex-1">
          <p className="text-justify w-[60%]">
            Dive into our comprehensive collection of courses taught by experts
            in their fields, and unlock your full potential through knowledge
            and skill acquisition.
          </p>
         <Link to="/allCourses">
         <button className="mr-5 py-2 px-3 uppercase bg-blue-800 text-white rounded-3xl font-serif">
            View All Courses
          </button>
         </Link>
        </div>
      </div>

      <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {courses.map((course, index) => (
          <div key={index} className="">
            <div
              className="max-w-sm h-[392px] border-[2px] border-gray-700"
              
            >
              <img src={course.photo} alt="" className="h-[200px] w-full"/>
              <h5 className="text-2xl font-bold mt-3 px-3">
                {course.title}
              </h5>
             <div className="flex justify-between my-5 px-3">
             {
              course.offerPrice == 0 ? 
              <>
               <p className="font-bold text-xl font-mono">
            ${course.price}
          </p>
              </>
              :
              <>
              <div className="flex gap-4 items-center font-mono">
          
          <p className="font-bold text-xl">
            ${course.offerPrice}
          </p>
          <p className="font-bold text-gray-500">
            <del>${course.price}</del>
          </p>
         </div>
         </>
             }
             <div className="flex items-center gap-1 font-semibold"><IoMdStar className="text-lg text-orange-500"></IoMdStar>{course.rating}</div>
             </div>
             <Link to={`/detailCourse/${course._id}`}>
              <button className="w-full bg-[#a945ec] text-white px-1 py-2 font-semibold"><span className="text-lg">See more ...</span></button>
            </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourse;
