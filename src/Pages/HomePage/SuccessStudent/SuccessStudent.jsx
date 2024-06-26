import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './succes.css'
import { Link } from "react-router-dom";

const SuccessStudent = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "../../../../public/successStudent.json"
      );
      // console.log(response.data);
      setStudents(response.data.slice(0, 10));
    };

    fetchData();
  }, []);

  return (
    <div className="my-10">
      <h1 className="text-4xl font-semibold text-center">
        Our Success Students
      </h1>
      <h1 className="text-center font-semibold">
        Your Success is our insparation
      </h1>

   
        <div className="w-[85%] m-auto">
        <Slider {...settings} >
          {students.map((data) => (
            <>
              <div className="bg-white mx-2 my-10  h-[350px] rounded-xl max-w-[350px] border-[1px] ">
                <img src={data.img} alt="" className="w-full h-[200px] p-5" />
                <div className="flex flex-col justify-center items-center gap-4 p-2">
                  <h1 className="font-bold text-xl">{data.name}</h1>
                  <h1 className="font-bold text-[14px] text-blue-800">{data.profession}</h1>
                  <p className="text-sm">{data.company_name}</p>
                </div>
              </div>
            </>
          ))}
        </Slider>
        </div>

        <div className="flex justify-center mt-10">
       <Link to="/success-story">
       <button className="mr-5 py-2 px-3 uppercase bg-blue-800 text-white rounded-3xl font-serif">
            View More
          </button>
        </Link>
        </div>
  
    </div>
  );
};

export default SuccessStudent;
