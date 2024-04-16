import { useLoaderData } from "react-router-dom";


const SingleCourse = () => {
    const loadedCourse=useLoaderData();

    const {title}=loadedCourse;
    return (
        <div>
            <p>{title}</p>
        </div>
    );
};

export default SingleCourse;