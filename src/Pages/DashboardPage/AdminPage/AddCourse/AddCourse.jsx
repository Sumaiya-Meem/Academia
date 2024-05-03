import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Label, Select } from "flowbite-react";


const IMG_HOASTING_KEY = import.meta.env.VITE_IMAGE_UPLOAD_API;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${IMG_HOASTING_KEY}`;

const AddCourse = () => {
  const {handleSubmit,register,reset,formState: { errors },watch,} = useForm();

  const axiosPublic = useAxiosPublic();
  const totalLearn = watch("learn");
  const totalCourseContent = watch("total_courseContent");

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
        courseLearn: [],
        total_instructor: data.total_instructor,
        instructorName: [],
        category: data.category,
        courseContent: [] 
      };
  
      // Instructors
      for (let i = 0; i < data.total_instructor; i++) {
        course.instructorName.push({
          instructorName: data[`instructor_name_${i}`]
        });
      }
  
      // Learning outcomes
      for (let i = 0; i < data.learn; i++) {
        course.courseLearn.push({
          courseLearn: data[`course_learn_${i}`]
        });
      }
  
      // Course content
      for (let i = 0; i < data.total_courseContent; i++) {
        course.courseContent.push({
          title: data[`course_content_title_${i}`],
          subtitle: data[`course_content_subtitle_${i}`],
          video: data[`course_content_video_${i}`]
        });
      }
  
      // Post the course object
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

       <div className="flex gap-10">
       <div className="mb-4 flex-1">
          <label
           
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
        <div className="mb-4 flex-1">
        <div className="mb-4">
        <Label htmlFor="category">Category</Label>
        <Select id="category" {...register("category", { required: "Category is required" })} className="">
        <option>Select catgeory</option>
        <option>Python</option>
        <option>Java</option>
        <option>C++</option>
        <option>React</option>
        <option>Redux</option>
        <option>Vue</option>
        <option>Node</option>
        <option>Mongodb</option>
        <option>Cyber security</option>
        <option>Machine learning</option>
        
        </Select>
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>
    </div>
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

       {/* course content */}
       <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Total Course Content
          </label>
          <input
            type="number"
            {...register("total_courseContent", {})}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="my-4">
          {Array.from({ length:totalCourseContent}).map((_, index) => (
            <div key={index} className="">
              <div>
              <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course Title{index+1} 
          </label>
                <input
                  type="text"
                  {...register(`course_content_title_${index}`, {})}
                  className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  
                 />
              </div>
              <div>
              <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course Subtitle{index+1} 
          </label>
                <input
                  type="text"
                  {...register(`course_content_subtitle_${index}`, {})}
                  className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  
                 />
              </div>
              <div>
              <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course Vedio{index+1} 
          </label>
                <input
                  type="text"
                  {...register(`course_content_video_${index}`, {})}
                  className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  
                 />
              </div>
            </div>
          ))}
        </div>

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
