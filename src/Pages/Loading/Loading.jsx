import Lottie from "lottie-react";
import errorAnimation from "../../assets/animation/Animation - 1713241886780.json"


const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-5">
        <Lottie animationData={errorAnimation} loop={true} />
   
       
    </div>
    );
};

export default Loading;