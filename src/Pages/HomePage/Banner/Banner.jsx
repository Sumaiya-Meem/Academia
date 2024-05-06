import { Button } from "flowbite-react";
import bannerImg from "../../../assets/banner.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../../Pages/variants";
const Banner = () => {
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(5,10,35,0.75), rgba(5,10,35,0.75)), url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };

  return (
    <div style={backgroundImageStyle} className="relative">
      <div className="flex flex-col absolute text-white top-[30%] left-[2%] lg:left-[10%]">
        <motion.div
         variants={fadeIn('down',0.3)}
         initial='hidden'
         whileInView={'show'}
         viewport={{once:false,amount:0.6}}

        >
          <h1 className="uppercase  lg:text-2xl mb-3">Welcome to academia</h1>
          <h1 className="text-xl lg:text-5xl font-serif mb-4">
            Best Online Education <br></br> Expertise
          </h1>
          <p className="text-justify w-full md:w-[60%] mb-5">
            Embark on a journey of knowledge with our world-class online
            education platform.Explore interactive courses, personalized
            experiences, and join our vibrant community to unlock your full
            potential
          </p>
        </motion.div>
        <motion.div className="flex gap-3 "
         variants={fadeIn('up',0.4)}
         initial='hidden'
         whileInView={'show'}
         viewport={{once:false,amount:0.6}}
        >
          <Button className="uppercase bg-blue-700">Get started</Button>
          <Link to="/allCourses">
            <Button gradientDuoTone="purpleToPink" className="uppercase">
              View Course
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
