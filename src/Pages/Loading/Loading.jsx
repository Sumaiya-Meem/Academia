// import Lottie from "lottie-react";
// import errorAnimation from "../../assets/animation/Animation - 1713241886780.json"
import { Spinner } from "flowbite-react";


const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-5">
          <Spinner aria-label="Extra large spinner example" size="xl" />
   
    </div>
    );
};

export default Loading;