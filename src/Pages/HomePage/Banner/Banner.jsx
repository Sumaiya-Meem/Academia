import { Button } from "flowbite-react";
import bannerImg from "../../../assets/banner.jpg"

const Banner = () => {

    const backgroundImageStyle = {
        backgroundImage: `linear-gradient(rgba(5,10,35,0.75), rgba(5,10,35,0.75)), url(${bannerImg })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      };

    return (
        <div style={backgroundImageStyle} className="relative">
            <div className="flex flex-col absolute text-white top-[30%] left-[10%] space-y-3">
                <h1 className="uppercase  text-2xl">Welcome to academia</h1>
                <h1 className="text-5xl font-serif">Best Online Education <br></br> Expertise</h1>
                <p className="">Embark on a journey of knowledge with our world-class online education platform.<br></br> Explore interactive courses, personalized experiences, and join our vibrant
                <br></br> community to unlock your full potential</p>
               
               <div className="flex gap-3 ">
               <Button  className="uppercase bg-purple-800">Get started</Button>
                <Button gradientDuoTone="purpleToPink" className="uppercase">
        View Course
      </Button>
               </div>
            </div>
            
        </div>
    );
};

export default Banner;