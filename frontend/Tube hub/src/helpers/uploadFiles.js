// import { toast } from "react-toastify";
import {VITE_API_CLOUDINARY_CLOUD_NAME} from "../constants/config"

// console.log(process.env.VITE_API_CLOUDINARY_CLOUD_NAME);
const url = `https://api.cloudinary.com/v1_1/${VITE_API_CLOUDINARY_CLOUD_NAME}/auto/upload`;



const uploadFile = async (file) => {
  console.log(VITE_API_CLOUDINARY_CLOUD_NAME);
//   toast.warning("File uploading is in process.........after processing press Submit )", {
//     position: "top-center",
//     autoClose: 10000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "",
//   });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "YT_HUB");

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const responseData = await response.json();

  return responseData;
};

export default uploadFile;
