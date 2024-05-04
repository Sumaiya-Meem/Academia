import useCourse from "../../../../Hooks/useCourse";
import Loading from "../../../Loading/Loading";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
const AllCourses = () => {
    const [courses ] = useCourse();

  if (!courses) {
    return <Loading></Loading>;
  }
    return (
        <div className="mt-0 pt-10">
          <h1 className="text-2xl mt-10 text-center font-bold font-serif">Our Popular Course</h1>
                <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-16 mx-5">
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

export default AllCourses;