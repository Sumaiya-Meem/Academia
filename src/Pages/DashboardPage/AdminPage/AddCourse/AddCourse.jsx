import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const IMG_HOASTING_KEY = import.meta.env.VITE_IMAGE_UPLOAD_API;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${IMG_HOASTING_KEY}`;

const AddCourse = () => {
  const {handleSubmit,register,reset,formState: { errors },watch,} = useForm();

  const axiosPublic = useAxiosPublic();
  const totalLearn = watch("learn");

  const total_instructor = watch("total_instructor");

  const onSubmit = async (data) => {
    // console.log(data);
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
        const course = {
            title: data.title,
            subTitle: data.subTitle,
            photo: img_url,
            rating: data.rating,
            totalRating: data.total_rating,
            totalEnrollStudent: data.total_student,
            updateDate: data.updateDate,
            price: data.price,
            offerPrice: data.offer_price,
            totalLearn: data.learn,
            courseLearn:[],
            total_instructor: data.total_instructor,
            instructorName:[]
          };
      
          for (let i = 0; i < data.total_instructor; i++) {
            const ins_name= {
                instructorName: data[`instructor_name_${i}`],
            };
      
            course.instructorName.push(ins_name);
          }

          for (let i = 0; i < data.learn; i++) {
            const section = {
                courseLearn: data[`course_learn_${i}`],
            };
      
            course.courseLearn.push(section);
          }

          
      
          
      console.log(course)
          axiosPublic.post("/course", course).then((res) => {
            if (res.data.acknowledged) {
              toast.success("Course added successfully");
              reset();
            }
          });
        }
      };
  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h2 className="text-3xl font-semibold mb-4">Add Course</h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="subTitle"
            {...register("subTitle", { required: "Title is required" })}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course Image
          </label>
          <input
            type="file"
            id="photo"
            {...register("photo", { required: "Photo is required" })}
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
              Rating
            </label>
            <input
              type="text"
              id="rating"
              {...register("rating", {})}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Total Review
            </label>
            <input
              type="number"
              id="total rating"
              {...register("total_rating", {})}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Total Enroll Student
            </label>
            <input
              type="number"
              id="total Enroll Student"
              {...register("total_student", {})}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        {/*  */}

        <div className="mb-4 grid grid-cols-3 gap-2">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Update
            </label>
            <input
              type="date"
              id="updateDate"
              {...register("updateDate", {})}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price", {})}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Offer Price
            </label>
            <input
              type="number"
              id="offer_price"
              {...register("offer_price", {})}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="total_section"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            What they Learn from the course
          </label>
          <input
            type="number"
            id="learn"
            {...register("learn", {})}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="my-4">
          {Array.from({ length: totalLearn }).map((_, index) => (
            <div key={index} className="">
              <div>
                
                <input
                  type="text"
                  id={`course_learn_${index}`}
                  {...register(`course_learn_${index}`, {})}
                  className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
          ))}
        </div>



{/* Total Instructor */}
        <div className="mb-4">
          <label
            htmlFor="total_section"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Total Instructor
          </label>
          <input
            type="number"
            id="total_instructor"
            {...register("total_instructor", {})}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="my-4">
          {Array.from({ length: total_instructor}).map((_, index) => (
            <div key={index} className="">
              <div>
              <label
            htmlFor="total_section"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Instructor{index+1} Name 
          </label>
                <input
                  type="text"
                  {...register(`instructor_name_${index}`, {})}
                  className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  id={`instructor_name_${index}`}
                 />
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mb-4">
          <label
            htmlFor="total_section"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           Total Instructors
          </label>
          <input
            type="number"
            id="instructors"
            {...register("instructors", {})}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4 ">
          {Array.from({ length: totalInstructor }).map((_, index) => (
            <div key={index} className="">
              <div className="flex gap-7">
              <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Instructor name {index + 1}
                </label>
                <input
                  type="text"
                  id={`instructor_name_${index}`}
                  {...register(`instructor_name_${index}`, {})}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              {/* <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           Instructor Photo
          </label>
          <input
            type="file"
            id="instructor_photo"
            {...register("instructor_photo", { required: "Photo is required" })}
            className={`w-full p-2 block border rounded bg-transparent ${
              errors.password ? "border-red-500" : "border-gray-500"
            }`}
          />
          {errors.instructor_photo && (
            <span className="text-red-500 text-sm">{errors.instructor_photo.message}</span>
          )}
        </div> 
              </div>
               <div className="grid grid-cols-3 gap-3 mt-3">
               <div className="my02">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Instructor rating {index + 1}
                </label>
                <input
                  type="text"
                  id={`instructor_rating_${index}`}
                  {...register(`instructor_rating_${index}`, {})}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Instructor total_student {index + 1}
                </label>
                <input
                  type="number"
                  id={`instructor_total_student_${index}`}
                  {...register(`instructor_total_student_${index}`, {})}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Instructor total_course {index + 1}
                </label>
                <input
                  type="number"
                  id={`instructor_total_course_${index}`}
                  {...register(`instructor_total_course_${index}`, {})}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
               </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Instructor About {index + 1}
                </label>
                <textarea
                  id={`instructor_about_${index}`}
                  {...register(`instructor_about_${index}`, {})}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                ></textarea>
              </div>
            </div>
          ))}
        </div> */} 

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

export default AddCourse;
