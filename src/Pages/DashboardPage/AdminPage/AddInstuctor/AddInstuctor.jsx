import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const IMG_HOASTING_KEY = import.meta.env.VITE_IMAGE_UPLOAD_API;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${IMG_HOASTING_KEY}`;

const AddInstuctor = () => {

    const {handleSubmit,register,reset,formState: { errors },} = useForm();
    const axiosPublic = useAxiosPublic();


    const onSubmit = async (data) => {
       
        const imgFile = { image: data.photo[0] };
    console.log(imgFile);
    const res = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(res);
    const img_url = res?.data?.data?.display_url;
    // console.log(img_url);
 

    if (img_url) {
        const instructor = {
            name: data.name,
            profession: data.profession,
            description: data.description,
            instructorPhoto: img_url,
            totalreview: data.total_review,
            totalEnrollStudent: data.total_student,
            totalEnrollCourse: data.total_course,
          };
      
          
      console.log(instructor)
        //   axiosPublic.post("/course", course).then((res) => {
        //     if (res.data.acknowledged) {
        //       toast.success("Course added successfully");
        //       reset();
        //     }
        //   });
        }
      };

    return (
        <div className="mx-5">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h2 className="text-3xl font-semibold mb-4">Add Instructor</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Instuctor Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Instuctor Profession
          </label>
          <input
            type="text"
            {...register("profession", { required: "profession is required" })}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            {...register("description", { required: "Name is required" })}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Photo
          </label>
          <input
            type="file"
            id="photo"
            {...register("photo", { })}
            className={`w-full p-2 block border rounded bg-transparent ${
              errors.password ? "border-red-500" : "border-gray-500"
            }`}
          />
          {errors.photo && (
            <span className="text-red-500 text-sm">{errors.photo.message}</span>
          )}
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Total Review
            </label>
            <input
              type="number"
              {...register("total_review", {})}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Total Enroll Student
            </label>
            <input
              type="number"
              {...register("total_student", {})}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Total Course
            </label>
            <input
              type="number"
              {...register("total_course", {})}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        
        {/*  */}
       

        <button
          type="submit"
          className="bg-blue-800 text-white py-2 px-4  mb-5 rounded hover:bg-blue-900 focus:outline-none focus:ring focus:border-blue-900"
        >
          Add
        </button>
      </form>
    </div>
    );
};

export default AddInstuctor;