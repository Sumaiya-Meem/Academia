
import { useContext } from "react";
import { useForm } from "react-hook-form";
import {Link , useNavigate} from 'react-router-dom'

import { ContextProvider } from "../Context/AuthProvider";

import bg from "../../assets/login.avif";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


const IMG_HOASTING_KEY = import.meta.env.VITE_IMAGE_UPLOAD_API;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${IMG_HOASTING_KEY}`

const Register = () => {

    const axiosPublic = useAxiosPublic();
    const {createUser} = useContext(ContextProvider);
    const navigate = useNavigate()
    

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit =async (data) => {
        console.log(data);
        const imgFile = { image: data.photo[0] }
        console.log(imgFile)
        const res = await axiosPublic.post(img_hosting_api, imgFile, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
        console.log(res)
        const img_url = res?.data?.data?.display_url;
        console.log(img_url)
        if(img_url){
            createUser(data.email, data.password)
            .then(result=> {
                console.log(result.user)
                if(result.user){
                     updateProfile(auth.currentUser, {
                        displayName: data.username,
                        photoURL: img_url,
                     })
                     .then(()=> {

                        axiosPublic.post('/users', {email: result?.user?.email, name: result?.user?.displayName})
                        .then(res=> {
                            if (res.data.insertedId) {
                                console.log('user added to the database')
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                            }
                        }) 
                        
                     })
                     .catch(error=> {
                        toast.error(error.message)
                     })
                }
            })
            .catch(error=> {
                toast.error(error.message);
            })
        }
     }
    const backgroundImageStyle = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      };
    

    return (
        <div style={backgroundImageStyle} className="w-full bg-gradient-to-r from-[#00000033] to-[#00000033] mt-0">
        <div className="flex items-center justify-center w-[100%] md:w-[60%] lg:w-[40%] mx-auto " >
      <div className="mt-28 text-white p-4 w-full bg-gray-400 shadow-lg rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-600">
 

                <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl text-white font-bold mb-2">Registration Now</h2>

                    <div className="mb-2">
                        <input
                            type="text"
                            id="username"
                            placeholder="name"
                            {...register('username', { required: 'Username is required' })}
                            className={`w-full p-2 border block rounded bg-transparent ${errors.username ? 'border-red-500' : 'border-gray-500'}`}
                        />
                        {errors.username && <span className="text-red-700 text-sm">{errors.username.message}</span>}
                    </div>                   

                    <div className="mb-2">
                      
                        <input
                            type="text"
                            id="email"
                            placeholder="email"
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            className={`w-full p-2 border block rounded bg-transparent ${errors.email ? 'border-red-500' : 'border-gray-500'}`}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    <div className="mb-2">
                       
                        <input
                            type="password"
                            id="password"
                            placeholder="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`w-full p-2 block border rounded bg-transparent ${errors.password ? 'border-red-500' : 'border-gray-500'}`}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>

                    <div className="mb-2">
                        <input
                            type="file"
                            id="photo"
                            {...register('photo', { required: 'Photo is required' })}
                            className={`w-full p-2 block border rounded bg-transparent ${errors.password ? 'border-red-500' : 'border-gray-500'}`}
                        />
                        {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className=" bg-blue-900 border border-gray-400  w-full rounded-md font-bold px-4 py-2 focus:outline-none focus:shadow-outline-blue"
                        >
                            Sing Up
                        </button>
                    </div>
                    <h1 className="mt-2">Do You Have Any Account? <Link className="text-blue-400 font-bold underline" to='/login'>Login</Link></h1>
                </form>


            </div>
            </div>
            
        </div>
    );
};

export default Register;