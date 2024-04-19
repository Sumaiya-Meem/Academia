import axios from "axios";
import { useEffect, useState } from "react";

const AllSuccessStudent = () => {
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
        <div>,
            <h1 className="mt-5"></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mt-10">
            {students.map((data) => (
            <>
              <div className="bg-white mx-2 my-3 h-[350px] rounded-xl max-w-[350px] border-[1px] ">
                <img src={data.img} alt="" className="w-full h-[200px] p-5" />
                <div className="flex flex-col justify-center items-center gap-4 p-2">
                  <h1 className="font-bold text-xl">{data.name}</h1>
                  <h1 className="font-bold text-[14px] text-blue-800">{data.profession}</h1>
                  <p className="text-sm">{data.company_name}</p>
                </div>
              </div>
            </>
          ))}
        </div>
        </div>
        
    );
};

export default AllSuccessStudent;