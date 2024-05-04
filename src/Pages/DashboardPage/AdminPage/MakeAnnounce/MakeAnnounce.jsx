import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { ContextProvider } from "../../../Context/AuthProvider";

const MakeAnnounce = () => {
  const{setCount}=useContext(ContextProvider);
  const { handleSubmit, register } = useForm();
  const axiosSecure = useAxiosPublic();

  const currentDate = new Date();
  // console.log(currentDate)
  const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
//   console.log(formattedDate);

  const onSubmit = (data) => {
    const announcement = {
      title: data.description,
      date: formattedDate,
    };

    axiosSecure.post("/announcement", announcement).then((res) => {
      console.log(res.data);
      if (res.data.acknowledged) {
        toast.success("create announcement successfully");
        setCount(prev => prev + 1);
        
      }
    });
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-8 p-8 border rounded shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl font-semibold mb-4">Make Announcement</h2>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-950 focus:outline-none focus:ring focus:border-blue-300"
          >
            Add
          </button>
        </form>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default MakeAnnounce;
