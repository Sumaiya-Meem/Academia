import axios from "axios";
import { useEffect, useState } from "react";
import { CgStudio } from "react-icons/cg";


const SuccessStudent = () => {

    const [students,setStudents]=useState([]);

    useEffect(() => {
        const fetchData = async () => {

                const response = await axios.get('../../../../public/successStudent.json');
                // console.log(response.data);
                setStudents(response.data);
            
        };

        fetchData();
    }, []);
    // console.log(students)

    return (
        <div className="my-10">
            <h1 className="text-3xl font-semibold text-center">Our Success Students</h1>
            <h1 className="text-center font-semibold">Your Success is our insparation</h1>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mx-3 mt-10"> */}
                {
                    students.map((data)=>(
                        <>
                        <div className="bg-white mb-5 mx-3 h-[320px] rounded-xl max-w-[350px] border-[1px] ">
                             <img src={data.img} alt="" className="w-full h-[200px] p-5" />
                             <div className="flex justify-center items-center gap-4 p-2">
                             <h1>{data.name}</h1>
                             </div>
                        </div>
                        </>
                    ))
                }
            {/* </div> */}
        </div>
    );
};

export default SuccessStudent;