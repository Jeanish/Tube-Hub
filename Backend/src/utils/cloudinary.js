import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try { 
        if(!localFilePath) return null

        //upload file in cloudinary
       const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file has been uploaded suuccessfully
        console.log("file is uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath)
        // console.log(response)
        return response;

    } catch (error) {
         
      fs.unlinkSync(localFilePath) //remove the locally saved temporary file as upload operation got failed
      return null;
        
    }
}

export {uploadOnCloudinary}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });