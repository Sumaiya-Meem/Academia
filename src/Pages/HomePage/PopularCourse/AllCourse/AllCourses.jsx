import useCourse from "../../../../Hooks/useCourse";
import Loading from "../../../Loading/Loading";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import './AllCourse.css'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
const AllCourses = () => {
    // const [courses ] = useCourse();
    const {count}= useLoaderData();
    const axiosSecure = useAxiosPublic();
    const [currentPage,setCurrentPage]=useState();
    const [courses,setCourses]=useState([]);

  if (!courses) {
    return <Loading></Loading>;
  }

  const coursePerPage=6;
  const numberOfPages=Math.ceil(count/coursePerPage);

  const pages=[...Array(numberOfPages).keys()];
  console.log(pages)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axiosSecure.get(`/course?page=${currentPage}&size=${coursePerPage}`)
        .then(res => {         
            setCourses(res.data);
        })

}, [axiosSecure, currentPage,coursePerPage])

  const sliceTitle = (title) => {
    const wordLimit = 5;
    const words = title.split(' ');
  
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : title;
  };

  AOS.init();

  const handlePrev =()=>{
    if(currentPage>0){
      setCurrentPage(currentPage-1);
    }
    // else if(currentPage<0){
    //   setCurrentPage(currentPage);
    // }
  }
  const handleNext =()=>{
    // console.log(pages.length)
    if(currentPage<pages.length){
      
      setCurrentPage(currentPage+1);
    }
    else if(currentPage == pages.length){
      setCurrentPage(currentPage);
    }
  }

 
    return (
        <div className="mt-0 pt-10">
          <h1 className="text-2xl mt-10 text-center font-bold font-serif">Our Popular Course</h1>
                <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 mx-5">
        {courses.map((course, index) => (
           <div key={index} className="mb-5"
           data-aos="fade-up"
           data-aos-duration="1000"
           data-aos-easing="ease-in-out"
           >
           <div
             className="max-w-sm h-[392px] border-[2px] border-gray-700"
             
           >
             <img src={course.photo} alt="" className="h-[200px] w-full"/>
             <h5 className="text-2xl font-bold mt-3 px-3 h-[64px]">
               {sliceTitle(course.title)}
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

      <div className="pagination flex justify-center mt-5">
        <button className=""><MdOutlineKeyboardArrowLeft onClick={handlePrev}></MdOutlineKeyboardArrowLeft></button>
          {pages.map(page=>
          <button key={page} className={currentPage == page+1 ? 'selected':" "}
          onClick={()=>setCurrentPage(page+1)}>{page+1}</button>
          
          )}
           <button><MdKeyboardArrowRight onClick={handleNext}></MdKeyboardArrowRight></button>
      </div>
        </div>
    );
};

export default AllCourses;