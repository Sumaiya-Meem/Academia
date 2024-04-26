import { Link, useLoaderData } from "react-router-dom";
import { Button, Card, Rating } from "flowbite-react";
import { TbSettingsCheck } from "react-icons/tb";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdTabletAndroid } from "react-icons/md";
import { LiaInfinitySolid } from "react-icons/lia";
import { LiaCertificateSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import { FaPlayCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import "./course.css";
import useInstructor from "../../../../Hooks/useInstructor";
import Loading from "../../../Loading/Loading";
import usePaymentHistory from "../../../../Hooks/usePaymentHistory";
import { useContext, useState } from "react";
import { ContextProvider } from "../../../Context/AuthProvider";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const SingleCourse = () => {
  const loadedCourse = useLoaderData();
  const { instructors, isLoading } = useInstructor();
  const axiosPublic = useAxiosPublic();

  const {user}=useContext(ContextProvider);
  const {payments}=usePaymentHistory();
  const [addCart,setAddCart]=useState(true);

  // const [instructor,setInstructor]=useState([]);
  // console.log(instructor)

  if (isLoading) {
    <div>
      <Loading></Loading>
    </div>;
  }
  

  const {
    title,
    subTitle,
    instructorName,
    updateDate,
    rating,
    totalRating,
    totalEnrollStudent,
    photo,
    price,
    offerPrice,
    courseLearn,
    _id,
  } = loadedCourse;

  const filledStars = Math.round(parseFloat(rating));

  const percentageDiscount = ((price - offerPrice) / price) * 100;
  const discount = Math.round(percentageDiscount);

  const hasPurchased = payments.find(payment =>
    payment.email === user.email && payment.courseTitle === title
  );

  console.log(hasPurchased)

  // console.log(instructors)
  // console.log(instructorName)

  const courseInstructors = instructors.filter((instructor) =>
    instructorName.some((data) => data.instructorName === instructor.name)
  );
  console.log(courseInstructors);

  const handleAddCart = (loadedCourse)=>{
    console.log(loadedCourse);
    const cartItem ={
      email:user.email,
      courseId:_id,
      title,
      price,
      offerPrice,
      photo,
      rating,
    totalRating,

    }
    axiosPublic.post("/carts", cartItem)
    .then((res) => {
      if (res.data.acknowledged) {
        toast.success("course added to cart");
        setAddCart(false);
      }
    });

  }

  return (
    <div className="mt-0">
      <div className="pt-14">
        <div className="bg-gray-800 space-y-5 px-2 relative">
          <h1 className="text-white font-bold mb-4 text-2xl lg:text-[35px] w-[50%] pt-4">
            {title}
          </h1>
          <p className="text-white w-[50%] ">{subTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 gap-1 w-[40%]">
            <div className="text-orange-500 flex items-center gap-2 ">
              <p className="font-bold">{rating}</p>

              <Rating>
                {[...Array(filledStars)].map((_, index) => (
                  <Rating.Star key={index} filled />
                ))}
                {[...Array(5 - filledStars)].map((_, index) => (
                  <Rating.Star key={index} filled={false} />
                ))}
              </Rating>
            </div>

            <div className="text-[#c0c4fc] underline">
              <p>
                (
                {parseInt(totalRating) > 999
                  ? parseInt(totalRating).toLocaleString()
                  : totalRating}
                <span className="ml-1">review</span>)
              </p>
            </div>
            <div className="text-white">
              <p className="font-semibold">
                {parseInt(totalEnrollStudent) > 999
                  ? parseInt(totalEnrollStudent).toLocaleString()
                  : totalEnrollStudent}
                <span className="ml-1">students</span>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <h1 className="text-white">Create by</h1>
            <div className=" text-white flex gap-3">
              {courseInstructors.length > 0
                ? courseInstructors.map((instructor, index) => (
                    <div key={index}>
                      <h3 className="underline text-[#c0c4fc]">
                        {instructor.name}
                      </h3>
                    </div>
                  ))
                : " "}
            </div>
          </div>
          <div className="flex gap-7 text-white ">
            <div className="flex items-center gap-2">
              <TbSettingsCheck></TbSettingsCheck>
              Last updated <span className="ml-2">{updateDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineGlobal></AiOutlineGlobal>
              English
            </div>
          </div>
        </div>
      </div>

      {/* card */}
      <Card className=" lg:absolute  lg:right-[4%] lg:top-20 lg:max-w-sm w-full min-h-[400px] shadow-md shadow-gray-500">
        <img src={photo} alt="" className="hidden lg:block" />
        {offerPrice == 0 ? (
          <>
            <p className="font-bold text-3xl lg:text-xl">${price}</p>
          </>
        ) : (
          <>
            <div className="flex gap-4 items-center">
              <p className="font-bold text-2xl">${offerPrice}</p>
              <p className="font-bold text-gray-500">
                <del>${price}</del>
              </p>
              <p>
                <span className="font-bold">{discount}</span> % Off
              </p>
            </div>
          </>
        )}
        {
          addCart ?
          <>
          <Button onClick={()=>handleAddCart(loadedCourse)} className="font-bold bg-[#1a5878]">Add to Cart</Button>
          </>
          
          :
          <>
           <Button className="font-bold bg-[#1a5878]">Go to cart</Button>
          </>
          
        }
        <Link to="/make-payment" state={{ price: offerPrice > 0 ? offerPrice : price ,CourseTitle:title}}>
        <Button outline  className="font-bold w-full">
          <p className="">{hasPurchased ? 'Continue Course' : 'Buy Now'}</p>
          
        </Button>
        </Link>
        <div>
          <h1 className="font-bold">This course includes:</h1>
          <div className="flex flex-col mt-2">
            <div className="flex gap-4 items-center">
              <MdTabletAndroid></MdTabletAndroid>
              Access on mobile and TV
            </div>
            <div className="flex gap-4 items-center">
              <LiaInfinitySolid></LiaInfinitySolid>
              Full lifetime access
            </div>
            <div className="flex gap-4 items-center">
              <LiaCertificateSolid className=""></LiaCertificateSolid>
              Certificate of completion
            </div>
          </div>
        </div>
      </Card>

      {/*  what they learn section*/}
      <div className="learn mt-10 ml-3 mb-5 p-5 border-[1px] border-gray-400">
        <h1 className="font-bold text-xl"> What you'll learn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 my-3">
          {courseLearn &&
            courseLearn.map((learn, index) => (
              <>
                <div className="flex items-center gap-2">
                  <FaCheck></FaCheck>
                  <p key={index}>{learn.courseLearn}</p>
                </div>
              </>
            ))}
        </div>
      </div>

      <div className=" lg:ml-3 w-[98%] lg:w-[50%] mt-10">
        <h1 className="font-bold text-2xl  ml-3 lg:ml-0">Instructor</h1>
        <div className="flex gap-20">
        {courseInstructors.length > 0
                ? courseInstructors.map((instructor, index) => (
                    <div key={index} className="my-4">
                      <h3 className="text-lg text-[#5624d0] font-bold ml-3 lg:ml-0">
                        {instructor.name}
                      </h3>
                      <h1 className="ml-3 lg:ml-0">{instructor.profession}</h1>
                      <div className="flex gap-3 my-3 items-center ml-3 lg:ml-0">
                          <img src={instructor.instructorPhoto} alt=""  className="rounded-[50%] w-[100px] h-[100px]"/>
                          <div className="flex flex-col">
                               <div className="flex gap-2 items-center">
                               <IoMdStar></IoMdStar>
                               {instructor.totalreview} Reviews
                               </div>
                               <div className="flex gap-2 items-center">
                               <MdPeople></MdPeople>
                               {instructor.totalEnrollStudent} Students
                               </div>
                               <div className="flex gap-2 items-center">
                               <FaPlayCircle></FaPlayCircle>
                               {instructor.totalEnrollCourse} Courses
                               </div>
                          </div>
                      </div>
                      {/* <p className="text-justify">{instructor.description}</p> */}
                    </div>
                  ))
                : " "}
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
