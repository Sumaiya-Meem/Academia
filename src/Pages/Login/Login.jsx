import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { ContextProvider } from "../Context/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInGoogle } = useContext(ContextProvider);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

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
      navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

 
  const backgroundImageStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };

  return (
    <div className="flex justify-between" style={backgroundImageStyle}>
      <div className="flex shadow-lg mt-28 items-center" >
 
      <div className="">
        <form
          className="w-full  p-8 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full p-2 border block rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
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
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full p-2 block border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
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
              className=" px-4 py-2 bg-orange-200 w-full rounded-md font-bold  focus:outline-none focus:shadow-outline-blue"
            >
              Login
            </button>
            <div>
              <h1>OR</h1>
            </div>
            <div
              onClick={handleGoogle}
              className="w-full text-center border border-blue-600  px-4 py-2 rounded-full flex items-center justify-center gap-1 text-xl"
            >
                <p><FcGoogle></FcGoogle></p>
              <p>Google</p>
            </div>
          </div>
          <h1 className="mt-5">
            Are You New Here?{" "}
            <Link className="text-blue-700 underline" to="/registration">
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
