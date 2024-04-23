import Lottie from "lottie-react";
import { Button } from 'flowbite-react';
import errorAnimation from "../../assets/animation/Animation - 1701617232458.json"
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-5">
            <Lottie animationData={errorAnimation} loop={true} />
            <Link to="/">
            <Button className="mt-6">Go Back Home</Button>
            </Link>
           
        </div>
    );
};

export default ErrorPage;