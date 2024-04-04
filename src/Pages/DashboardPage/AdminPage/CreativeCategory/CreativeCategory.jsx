import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";


const CreativeCategory = () => {
    const { handleSubmit, register,reset} = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit =async (data) => {
        const category = {
            title:data.title,
            description: data.description
        }
        console.log(category)
        axiosPublic.post('/category', category)
        .then(res=> {
            console.log(res.data)
               if(res.data.acknowledged){
                
                       toast.success('create category successfully')
                       
               }
        })
        reset();
    }
    return (
        <div>
            <div className="max-w-md mx-auto mt-8 p-8 border-2 border-blue-900 rounded shadow-md shadow-blue-950">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-3xl font-semibold mb-4">Make Creative Category</h2>

                    {/* Title Field */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            {...register('title', { required: 'Title is required' })}
                            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register('description', { required: 'Description is required' })}
                            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                   

                    <button
                        type="submit"
                        className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-900 focus:outline-none focus:ring focus:border-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default CreativeCategory;