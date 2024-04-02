import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import bg from "../../assets/login.avif"
import { ContextProvider } from "../Context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser} = useContext(ContextProvider);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: 'User Login Successful.',
          showClass: {
              popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
          }
      });
  
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

 const handleGoogle =() =>{

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
      <div className="mt-28 text-white p-2 w-full bg-gray-400 shadow-lg rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-600">
 
   
        <form
          className=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full p-2 border block rounded bg-transparent ${
                errors.email ? "border-red-500" : "border-gray-500"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full p-2 block border rounded  bg-transparent  ${
                errors.password ? "border-red-500" : "border-gray-500"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 justify-between">
            <button
              type="submit"
              className=" px-4 py-2 bg-blue-900 w-full rounded-md font-bold  focus:outline-none focus:shadow-outline-blue"
            >
              Login
            </button>
            <div>
              <h1>OR</h1>
            </div>
            <div
              onClick={handleGoogle}
              className="w-full text-center border bg-blue-900  px-4 py-2 rounded-full flex items-center justify-center gap-1 text-xl"
            >
                <p><FcGoogle></FcGoogle></p>
              <p>Google</p>
            </div>
          </div>
          <h1 className="mt-5">
          {"Don't"} have any account ? 
            <Link className="text-blue-400 underline ml-1" to="/registration">
               Registration
            </Link>
          </h1>
        </form>
    
      </div>
    </div>
    </div>
  );
};

export default Login;
