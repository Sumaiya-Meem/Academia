import {  useLoaderData } from "react-router-dom";
import { Card, Rating } from "flowbite-react";
import { TbSettingsCheck } from "react-icons/tb";
import { AiOutlineGlobal } from "react-icons/ai";
const SingleCourse = () => {
  const loadedCourse = useLoaderData();

  const { title, subTitle,instructorName, updateDate,rating, totalRating, totalEnrollStudent ,photo,price, offerPrice} =
    loadedCourse;

  const filledStars = Math.round(parseFloat(rating));

  console.log(instructorName)

  return (
    <div className="mt-0">
      <div className="pt-14">
        <div className="bg-gray-800 space-y-5 px-2 relative">
          <h1 className="text-white font-bold mb-4  text-[35px] w-[50%]">
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
                <span className="ml-1">ratings</span>
                )
              </p>
            </div>
            <div className="text-white">
              <p className="font-semibold">
                
                {parseInt(totalEnrollStudent) > 999
                  ? parseInt(totalEnrollStudent).toLocaleString()
                  : totalEnrollStudent } 
                 <span className="ml-1">students</span>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <h1 className="text-white">Create by</h1>
          {instructorName && instructorName.map((instructor, index) => (
              <p key={index} className="text-[#b674d3] underline">{instructor.instructorName}</p>
            ))}
          </div>
          <div className="flex gap-4 text-white ">
              <div className="flex items-center gap-2"><TbSettingsCheck></TbSettingsCheck>
                 {updateDate}
              </div>
              <div className="flex items-center gap-2"><AiOutlineGlobal></AiOutlineGlobal>
              English
              </div>
          </div>
         
        </div>
        </div>

        {/* card */}
        <Card
              className="absolute right-[13%] top-16 max-w-sm h-[400px] shadow-md shadow-gray-500"
              imgAlt=""
              imgSrc={photo}       
            >  
             {
              offerPrice == 0 ? 
              <>
               <p className="font-bold text-xl">
            ${price}
          </p>
              </>
              :
              <>
              <div className="flex gap-4 items-center">
          
          <p className="font-bold text-xl">
            ${offerPrice}
          </p>
          <p className="font-bold text-gray-500">
            <del>${price}</del>
          </p>
         </div></>
             }
             
            </Card>
      </div>

  );
};

export default SingleCourse;
