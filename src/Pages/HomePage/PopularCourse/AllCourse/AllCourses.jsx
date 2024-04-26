import useCourse from "../../../../Hooks/useCourse";
import Loading from "../../../Loading/Loading";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
const AllCourses = () => {
    const { courses } = useCourse();

  if (!courses) {
    return <Loading></Loading>;
  }
    return (
        <div>
                <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {courses.map((course, index) => (
          <div key={index} className="">
            <Card
              className="max-w-sm min-h-[450px] shadow-md shadow-gray-500"
              
            >
              <img src={course.photo} alt="" className="h-[200px]"/>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {course.title}
              </h5>
             <div className="">
             {
              course.offerPrice == 0 ? 
              <>
               <p className="font-bold text-xl">
            ${course.price}
          </p>
              </>
              :
              <>
              <div className="flex gap-4 items-center">
          
          <p className="font-bold text-xl">
            ${course.offerPrice}
          </p>
          <p className="font-bold text-gray-500">
            <del>${course.price}</del>
          </p>
         </div>
         </>
             }
             </div>
             <Link to={`/detailCourse/${course._id}`}>
              <Button className="w-full text-2xl"><span className="text-lg">See more ...</span></Button>
            </Link>
            </Card>
          </div>
        ))}
      </div>
        </div>
    );
};

export default AllCourses;