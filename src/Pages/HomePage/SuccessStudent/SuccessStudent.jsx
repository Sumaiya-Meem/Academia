import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './succes.css'

const SuccessStudent = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
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
      setStudents(response.data);
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

   
        <Slider {...settings} style={{ margin: 0, padding: 0 }}>
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
  );
};

export default SuccessStudent;
