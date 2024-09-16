import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFiles";
import axios from "axios";
// import SignIn from "./SignIn"
import imageCompression from "browser-image-compression";
import { BASE_URL } from "../constants/config";
import SignIn from "./Login";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import Login from "./Login";

const SignInPage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const dispatch = useDispatch();

  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // const { name, value } = e.target;
    // setData((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if(file){
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const fileSizeInKB = (compressedFile.size / 1024).toFixed(2);
      const fileSizeInMB = (fileSizeInKB / 1000).toFixed(2);

      console.log(fileSizeInKB, fileSizeInMB);

      if (fileSizeInKB > 1000) {
            console.log("File size is bigger then 1 MB");
        return;
      }

      const uploadPhoto = await uploadFile(compressedFile);
      
      if(uploadPhoto.secure_url){
        setData((prev)=>({
            ...prev,
            avatar:uploadPhoto.secure_url,
        }));
      }else{
        console.error('error uploading to cloudinary',uploadPhoto)
      }

      setUploadPhoto(compressedFile);
      setFileSize(fileSizeInKB);
    //   setData((prev) => ({
    //     ...prev,
    //     avatar: uploadPhoto?.secure_url,
    //   }));
    } catch (error) {
    //   toast.error(error?.response?.data?.message, {
    //     position: "top-center",
    //     autoClose: 20000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "",
    //   });
    console.log('error uploading the photo');
      console.log(error?.response?.data?.message);
    }
    }
  };

  const handleRemoveUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
    setFileSize(null);
    setData((prev) => ({
      ...prev,
      avatar: "",
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    // dispatch(loginStart())
    const URL = `${BASE_URL}/users/register`;

    try {
      const response = await axios.post(URL, data);
      // dispatch(loginSuccess(response.data))
      console.log("Response : ", response.data);
      const result = response;
    //   toast.success(response?.data?.message, {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "",
    //   });

      if (response?.data.success === true) {
        console.log("Registration successful, navigating to login...");
        setData({
          username: "",
          email: "",
          password: "",
          avatar: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log("Registration failed, no navigation.");
      dispatch(loginFailure());
    //   toast.error(error?.response?.data?.message, {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "",
    //   });
      console.log("Error : ", error);
    }

    console.log(data);
  };

  return (
    <div className="mt-5 flex justify-center items-center">
      <div className="text-white border border-secondary max-w-sm p-6 w-full rounded-2xl overflow-hidden flex justify-center items-center flex-col m-7">
        <p className="text-2xl py-4">
          <span className="text-xl
          ">
            <b>Welcome to</b>
          </span>{" "}
          <span className="text-secondary font-bold">YT-HUB</span>
        </p>
        <p className="text-xl font-extralight">Register</p>
        <form
          className="flex justify-center flex-col w-full"
          onSubmit={handleSubmit}
        >
          <table className="my-3 border-collapse w-full">
            <tbody>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="name">Name :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="username"
                    id="name"
                    type="text"
                    className="border text-black border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                    value={data.username}
                    onChange={handleOnChange}
                    required
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="email">Email :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="border text-black border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="password">Password :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="border text-black border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                    value={data.password}
                    onChange={handleOnChange}
                    required
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="avatar">Profile :
                  </label>
                </td>
                <td className="w-2/3">
                  <label htmlFor="avatar">
                    <div className="rounded-md h-10 mx-2 text-base w-full my-2 outline outline-1 outline-secondary flex justify-center items-center cursor-pointer">
                      <p className="text-xs px-2">
                        {uploadPhoto?.name ? uploadPhoto.name : "Upload here"}
                      </p>
                      {uploadPhoto?.name && (
                        <button
                          onClick={handleRemoveUploadPhoto}
                          className="px-2 hover:text-secondary"
                        >
                          <IoClose />
                        </button>
                      )}
                    </div>
                      <span className="text-xs px-2 text-secondary">
                         * not required
                      </span>
                  </label>
                  <input
                    name="avatar"
                    id="avatar"
                    type="file"
                    className="rounded-md mx-2 text-base w-full my-2 outline outline-1 outline-secondary hidden"
                    onChange={handleUploadPhoto}
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td colSpan="2" className="text-center">
                  <button
                    type="submit"
                    className="border w-full bg-secondary hover:bg-secondary2 border-secondary rounded-md my-4 mx-2 px-4 py-1 text-base text-white"
                  >
                    Register
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p>
          Already have Account?{" "}
          <Link
            to={"/login"}
            className="hover:text-secondary2 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>



  );
};

export default SignInPage;