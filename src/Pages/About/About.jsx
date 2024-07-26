import img from "../../../public/about.webp"
import { Button } from "flowbite-react";
const About = () => {
    return (
        <div className="py-4">
            <div className="flex pt-16 mx-5">
                <div className="flex-1">
                    <img src={img} alt=""  className="h-[300px] rounded-md"/>
                </div>
                <div className="flex-1">
                    <h1 className="text-4xl text-blue-800 font-bold font-[poppins]"> Welcome to Academia</h1>
               
                    <p className="text-xl font-medium my-3">
                    You can join with Edule  and upgrade your skill  for your <span className="text-blue-800 font-bold">bright future</span>.
                    </p>

                    <p className="">
                    At Academia, we believe that education is the key to unlocking personal and professional growth. 
                    Founded in 2000 by a passionate team of educators and technologists, our mission is to empower learners of all ages to explore their potential and achieve their educational goals.
                    </p>

                    <Button className="uppercase bg-blue-800 mt-5">Get started</Button>
                </div>
            </div>
        </div>
    );
};

export default About;