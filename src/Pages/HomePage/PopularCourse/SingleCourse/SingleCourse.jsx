import { Link, useLoaderData } from "react-router-dom";
import { Accordion, Card, Modal, Rating } from "flowbite-react";
import { TbSettingsCheck } from "react-icons/tb";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdTabletAndroid } from "react-icons/md";
import { LiaInfinitySolid } from "react-icons/lia";
import { LiaCertificateSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import { FaPlayCircle } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
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
import useCart from "../../../../Hooks/useCart";
import { PiVideoBold } from "react-icons/pi";
import useCourse from "../../../../Hooks/useCourse";

const SingleCourse = () => {
  const loadedCourse = useLoaderData();
  // console.log(loadedCourse)
  const [instructors, isLoading] = useInstructor();
  const axiosPublic = useAxiosPublic();

  const { user } = useContext(ContextProvider);
  const [payments] = usePaymentHistory();
  const [carts, refetch] = useCart();
  const [courses, isCourseLoading] = useCourse();


  if (isLoading || isCourseLoading) {
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
    courseContent,
    _id,
    category,
  } = loadedCourse;

  // console.log(courseLearn);
  // console.log(courseLearn)

  // const filledStars = Math.round(parseFloat(rating));
  const parsedRating = parseFloat(rating);
  const filledStars = !isNaN(parsedRating) ? Math.round(parsedRating) : 0;


 const totalStars = 5;
 const displayedFilledStars = Math.min(Math.max(filledStars, 0), totalStars);
 const emptyStars = totalStars - displayedFilledStars;

  const percentageDiscount = ((price - offerPrice) / price) * 100;
  const discount = Math.round(percentageDiscount);

  const hasPurchased = payments.find(
    (payment) =>
      payment.email === user.email && payment.courseTitle.includes(title)
  );

  // console.log(hasPurchased)
  // find related course base on category
  const relatedCourses = courses?.filter(
    (course) => course.category === category && course._id !== _id
  );
  // console.log("the related course are:", relatedCourses);

  const courseInstructors = instructors.filter((instructor) =>
    instructorName.some((data) => data.instructorName === instructor.name)
  );
  // console.log(courseInstructors);

  const addedCart = carts.find((cart) => cart.courseId == _id);
  // console.log(addedCart)
  const isCourseInCart = (courseId) => {
    // console.log(courseId)
    return carts.some((cartItem) => cartItem.courseId == courseId);
  };
 
  
  const handleAddCart = () => {
    // console.log(loadedCourse);
    const cartItem = {
      email: user.email,
      courseId: _id,
      title,
      price,
      offerPrice,
      photo,
      rating,
      totalRating,
    };
    axiosPublic.post("/carts", cartItem).then((res) => {
      if (res.data.insertedId) {
        toast.success("course added to cart");
        refetch();
      }
    });
  };

  const handleAddCart2 = (data) => {
    // console.log(loadedCourse);
    const cartItem = {
      email: user.email,
      courseId: data._id,
      title:data.title,
      price:data.price,
      offerPrice:data.offerPrice,
      photo:data.photo,
      rating:data.rating,
      totalRating:data.totalRating,
    };
    axiosPublic.post("/carts", cartItem).then((res) => {
      if (res.data.insertedId) {
        toast.success("course added to cart");
        refetch();
      }
    });
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleVideoOpen = (data) => {
    // console.log("Opening video for data:", data);
    if (hasPurchased) {
      setSelectedData(data); 
      setOpenModal(true);
    } else {
      toast.error("Please purchase the course to access the video.");
    }
  };

  return (
    <div className="mt-0">
      <div className="pt-14">
        <div className="bg-gray-800 space-y-5 px-2 relative">
          <h1 className="text-white font-bold mb-4 text-2xl lg:text-[35px] w-[50%] pt-4">
            {title}
          </h1>
          <p className="text-white w-[50%] ">{subTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 lg:gap-1 w-[35%]">
            <div className="text-orange-500 flex items-center gap-2 ">
              <p className="font-bold">{rating}</p>
              <Rating>
      {[...Array(displayedFilledStars)].map((_, index) => (
        <Rating.Star key={index} filled />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
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
              {courseInstructors.length >= 0
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
        {addedCart || isCourseInCart ? (
          <>
            <Link to="/allCart">
              <button className="font-bold w-full bg-[#a945ec] text-white p-2">
                Go to cart
              </button>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => handleAddCart(loadedCourse)}
              className="font-bold w-full bg-[#a945ec]  text-white p-2"
            >
              Add to Cart
            </button>
          </>
        )}
        <Link
          to="/make-payment"
          state={{
            price: offerPrice > 0 ? offerPrice : price,
            CourseTitle: title,
          }}
        >
          <button className="font-bold w-full border border-[#a945ec] p-2">
            <p className="">{hasPurchased ? "Continue Course" : "Buy Now"}</p>
          </button>
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
        <h1 className="font-bold text-xl"> What you will learn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 my-3">
          {courseLearn &&
            courseLearn.map((learn, index) => (
              <>
                <div className="flex items-center gap-2" key={index}>
                  <FaCheck></FaCheck>
                  <p>{learn.courseLearn}</p>
                </div>
              </>
            ))}
        </div>
      </div>

      {/* course content */}
      <div className="learn lg:ml-3">
        <h1 className="font-bold text-xl my-4">Course Content</h1>
        {courseContent.map((data, index) => (
          <Accordion key={index}>
            <Accordion.Panel>
              <Accordion.Title className="font-bold">
                {data.title}
              </Accordion.Title>
              <Accordion.Content>
                <button
                  onClick={() => handleVideoOpen(data)}
                  className="flex items-center gap-2"
                >
                  <PiVideoBold className="mt-1" />
                  <span>{data.subtitle}</span>
                </button>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        ))}

        {openModal && (
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Video Tutorial</Modal.Header>
            <Modal.Body>
              <div dangerouslySetInnerHTML={{ __html: selectedData?.video }} />
            </Modal.Body>
          </Modal>
        )}
      </div>

      {/* another course base on category */}
      <div className=" lg:ml-3 w-full lg:w-[64%] mt-10 ">
        <h1 className="text-2xl font-bold">Students also bought</h1>
        {relatedCourses.map((data,index) => (
         <div key={index} className="flex justify-between  mb-2 border-b my-3 py-2">
         <Link to={`/detailCourse/${data._id}`}>
           <div className="flex gap-3">
             <img src={data.photo} alt="" className="w-[150px] h-[70px]" />
             <div className="flex gap-10">
              <div> <p className="font-semibold text-base">{data.title}</p>
               <p className="font-semibold mt-3">Update: {data.updateDate}</p></div>
               <div className="flex gap-1">
                
                 <p className="font-bold">{data.rating}</p>
                 <IoMdStar className="mt-1 text-orange-500"></IoMdStar>
               </div>
               
             </div>
           </div>
         </Link>
         <div className="flex gap-12">
           <div>
             <h1 className="font-bold">${data.offerPrice > 0 ? data.offerPrice : data.price}</h1>           
           </div>
           <div className=" mr-5">
           {isCourseInCart(data._id) ? (
          <>
            <Link to="/allCart">
              <button className="font-medium w-full border   p-2">
                Go to cart
              </button>
            </Link>
          </>
        ) :
        (<>
        <div className="border-[1px] border-solid border-[#252525] rounded-full text-xl py-1 w-[35px] h-[35px] mb-3 bg-fuchsia-100">
            <button onClick={()=>handleAddCart2(data)}><BsCartPlus className="mt-1 ml-[6px]"></BsCartPlus></button>
            </div>
        </>)}
            
        

           </div>
         </div>
       </div>
        ))}
      </div>

      {/* instructor */}

      <div className=" lg:ml-3 w-[98%] lg:w-[50%] mt-10">
        <h1 className="font-bold text-2xl  ml-3 lg:ml-0">Instructor</h1>
        <div className="flex flex-col md:flex-row md:gap-20 ">
          {courseInstructors.length > 0
            ? courseInstructors.map((instructor, index) => (
                <div key={index} className="my-4">
                  <h3 className="text-lg text-[#5624d0] font-bold ml-3 lg:ml-0">
                    {instructor.name}
                  </h3>
                  <h1 className="ml-3 lg:ml-0">{instructor.profession}</h1>
                  <div className="flex gap-3 my-3 items-center ml-3 lg:ml-0">
                    <img
                      src={instructor.instructorPhoto}
                      alt=""
                      className="rounded-[50%] w-[100px] h-[100px]"
                    />
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
