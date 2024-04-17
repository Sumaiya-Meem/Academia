import { useLoaderData } from "react-router-dom";
import { Button, Card, Rating } from "flowbite-react";
import { TbSettingsCheck } from "react-icons/tb";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdTabletAndroid } from "react-icons/md";
import { LiaInfinitySolid } from "react-icons/lia";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaCheck } from "react-icons/fa6";
import './course.css'
const SingleCourse = () => {
  const loadedCourse = useLoaderData();

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
  } = loadedCourse;

  const filledStars = Math.round(parseFloat(rating));

  const percentageDiscount = ((price - offerPrice) / price) * 100;
  const discount = Math.round(percentageDiscount);

  return (
    <div className="mt-0">
      <div className="pt-14">
        <div className="bg-gray-800 space-y-5 px-2 relative">
          <h1 className="text-white font-bold mb-4  text-[35px] w-[50%] pt-4">
            {title}
          </h1>
          <p className="text-white w-[50%] ">{subTitle}</p>
          <div className="grid grid-cols-3 gap-1 w-[40%]">
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

            <div className="text-[#b674d3] underline">
              <p>
                (
                {parseInt(totalRating) > 999
                  ? parseInt(totalRating).toLocaleString()
                  : totalRating}
                <span className="ml-1">ratings</span>)
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
            {instructorName &&
              instructorName.map((instructor, index) => (
                <p key={index} className="text-[#b674d3] underline">
                  {instructor.instructorName}
                </p>
              ))}
          </div>
          <div className="flex gap-4 text-white ">
            <div className="flex items-center gap-2">
              <TbSettingsCheck></TbSettingsCheck>
              {updateDate}
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineGlobal></AiOutlineGlobal>
              English
            </div>
          </div>
        </div>
      </div>

      {/* card */}
      <Card
        className="absolute bg-fixed right-[13%] top-20 max-w-sm min-h-[400px] shadow-md shadow-gray-500"
        imgAlt=""
        imgSrc={photo}
      >
        {offerPrice == 0 ? (
          <>
            <p className="font-bold text-xl">${price}</p>
          </>
        ) : (
          <>
            <div className="flex gap-4 items-center">
              <p className="font-bold text-xl">${offerPrice}</p>
              <p className="font-bold text-gray-500">
                <del>${price}</del>
              </p>
              <p><span className="font-bold">{discount}</span> % Off</p>
            </div>
          </>
        )}
        <Button gradientDuoTone="purpleToPink" className="font-bold">Add to Cart</Button>
        <Button outline gradientDuoTone="purpleToPink" className="font-bold ">
        <p className="buybtn ">Buy Now</p>
        </Button>
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
      <div className="mt-10 mb-5 px-2 border-[1px] border-gray-400" style={{ width: 'calc(1024px - 384px)' }}>
        <h1 className="font-bold text-xl"> What you'll learn</h1>
        
           <div className="grid grid-cols-1 lg:grid-cols-2 my-3">
           
           {
            courseLearn && courseLearn.map((learn,index)=>(
                <>
                <div className="flex items-center gap-2">
                <FaCheck></FaCheck>
                <p key={index} >
                    {learn.courseLearn}
                </p>
                </div>
                </>
            ))
           }
          
           </div>
       
      </div>
    </div>
  );
};

export default SingleCourse;
