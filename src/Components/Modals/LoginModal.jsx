import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
// import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { StateManagementContext } from "../../Contexts/StateContext";
import toast from "react-hot-toast";

// IMAGE HOSTING KEY
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const LoginModal = () => {
  // states
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  //   getting data from stateContext
  const stateData = useContext(StateManagementContext);
  const {
    isLoginModalOpen,
    registerLoader,
    setRegisterLoader,
    loginLoader,
    setIsLoginModalOpen,
    setLoginLoader,
    isLoggedIn,
    setIsLoggedIn,
  } = stateData;

  // axios instance
  const axiosPublic = useAxiosPublic();

  // initializing form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   login and register form navigator
  const toLogin = () => {
    setIsLogin(true);
  };

  const toRegister = () => {
    setIsLogin(false);
  };

  //   submit form to register and login
  const onSubmit = async (data) => {
    if (!isLogin) {
      if (!data) {
        return toast.error("Something went wrong please try again later");
      } else {
        try {
          setRegisterLoader(true);
          const name = data.name;
          const email = data.email;
          const password = data.password;
          const image = data.image[0];

          // ready to send
          const userCredential = {
            email,
            password,
          };

          // sending post request to server to store user credentials
          const res = await axiosPublic.post(
            "/user_credential",
            userCredential
          );
          console.log("user_credential req --> response", res?.data);
          if (res?.data.insertedId) {
            const imgData = { image: image };

            // checking if image data exist
            if (!imgData) {
              return toast.error("Oops!!! Something Went Wrong!");
            }

            // hosting image to image bb
            const imgRes = await axiosPublic.post(image_hosting_api, imgData, {
              headers: {
                "content-type": "multipart/form-data",
              },
            });

            // if we get the image link from image bb then we can go for requesting server to store the user data with image
            if (imgRes?.data.data.display_url) {
              // this is the final image
              const userImage = imgRes?.data.data.display_url;

              // this is final user data
              const userData = {
                name,
                email,
                image: userImage,
              };
              const res = await axiosPublic.post("/user_data", userData);
              console.log("response from post user data", res?.data);
              if (res?.data.insertedId) {
                reset();
                setRegisterLoader(false);
                toast.success("Account created successfully");
                toLogin();
              } else {
                setRegisterLoader(false);
                toast.error(`${res?.data.message}`);
              }
            }
          } else {
            setRegisterLoader(false);
            toast.error(`${res?.data.message}`);
          }
        } catch (error) {
          setRegisterLoader(false);
          toast.error(`Something went wrong: ${error}`);
        }
      }
    } else {
      // if there is no data then return
      if (!data) {
        return toast.error("Something went wrong!");
      }

      // sending request to server
      const res = await axiosPublic.post("/user_authentication", data);
      if (!res.data.token) {
        return toast.error(`${res?.data.message}`);
      } else {
        toast.success(`${res?.data.message}`);
        // access token
        const accessToken = res.data.token;
        console.log("access token", accessToken);
        // storing access token to localstorage
        localStorage.setItem("user_access_token", accessToken);
        setIsLoggedIn(!!localStorage.getItem("user_access_token"));
        handleModalClose();
      }
    }
  };

  //   handle login modal close
  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    reset();
    toLogin();
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white lg:w-[800px] lg:h-[500px] shadow-lg relative flex flex-col md:flex-row overflow-hidden  mx-3 lg:mx-0"
          >
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="btn btn-circle border-none shadow-none bg-transparent absolute top-4 right-4 text-gray-600 hover:text-red-500 hover:rotate-90 transition-transform duration-300 z-50 cursor-pointer"
            >
              <RxCross1 size={35} />
            </button>

            {/* Left Image */}
            <div
              className="hidden md:block w-full md:w-1/2 h-full object-cover transition-transform duration-500 relative"
              style={{
                transform: isLogin ? "translateX(0%)" : "translateX(100%)",
              }}
            >
              <img
                src="https://c4.wallpaperflare.com/wallpaper/483/1019/759/people-live-hands-wallpaper-preview.jpg"
                alt="Visual"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
                <h2 className="text-3xl font-bold marcel">
                  Welcome To Eventora !
                </h2>
                <p className="text-lg mt-2 sand font-semibold">
                  Join us and enjoy exclusive features.
                </p>
              </div>
            </div>

            {/* Right Side Form */}
            <div
              className={`w-[400px] md:w-1/2 h-full flex flex-col justify-center items-center p-8 transition-transform duration-500 relative ${
                isLogin
                  ? "md:translate-x-0"
                  : "translate-x-0 md:-translate-x-full"
              }`}
            >
              {/* Login Form */}
              {isLogin && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-6 absolute inset-0 transition-opacity duration-500 p-6"
                  style={{ opacity: isLogin ? 1 : 0 }}
                >
                  <h2 className="text-3xl  font-bold mb-4 marcel">
                    <span className="text-[#FE3E01]">Eventora</span> Login
                  </h2>

                  {/* email input */}
                  <div>
                    <div className="relative w-full">
                      <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-500 text-[12px] sand">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* password input */}
                  <div>
                    <div className="relative w-full">
                      <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-red-500 text-[12px] sand">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full btn shadow-none bg-transparent border border-[#FE3E01] hover:bg-[#FE3E01] text-black hover:text-white py-2 rounded-none transition sand"
                  >
                    {loginLoader ? (
                      <span className="loading loading-spinner text-error"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              )}

              {/* Registration Form */}
              {!isLogin && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full md:flex flex-col absolute inset-0 transition-opacity duration-500 p-6"
                  style={{ opacity: isLogin ? 0 : 1 }}
                >
                  <h2 className="text-3xl font-bold mb-4 marcel">
                    <span className="text-[#FE3E01]">Eventora</span> Register
                  </h2>

                  {/* image input */}
                  <div className="mb-3">
                    <div className="relative w-full ">
                      <input
                        type="file"
                        className="file-input"
                        {...register("image", {
                          required: "Image is required",
                        })}
                      />
                    </div>
                    {errors.image && (
                      <span className="text-red-500 text-[12px] sand">
                        {errors.image.message}
                      </span>
                    )}
                  </div>

                  {/* name input */}
                  <div className=" mb-3 md:mb-6">
                    <div className="relative w-full  md:mb-0">
                      <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand"
                      />
                    </div>
                    {errors.name && (
                      <span className="text-red-500 text-[12px] sand">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* email input */}
                  <div className="mb-3 md:mb-6">
                    <div className="relative w-full md:mb-0">
                      <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-500 text-[12px] sand">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* password input */}
                  <div className="mb-3 md:mb-6">
                    <div className="relative w-full">
                      <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                          pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                            message:
                              "Password must contain at least one capital letter and one number",
                          },
                        })}
                        className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-red-500 text-[12px] sand">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className=" mb-6 md:mb-0 w-full btn shadow-none bg-transparent border border-[#FE3E01] hover:bg-[#FE3E01] text-black hover:text-white py-2 rounded-none transition sand"
                  >
                    {registerLoader ? (
                      <span className="loading loading-spinner text-error"></span>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
              )}
              <p className="mt-[400px] text-sm text-gray-600 z-50">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <span
                      className="text-blue-600 cursor-pointer"
                      onClick={toRegister}
                    >
                      Register
                    </span>
                  </>
                ) : (
                  <>
                    Already registered?{" "}
                    <span
                      className="text-blue-600 cursor-pointer"
                      onClick={toLogin}
                    >
                      Login
                    </span>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
