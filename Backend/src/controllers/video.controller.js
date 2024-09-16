import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import getVideoDuration from "get-video-duration";
import { v2 as cloudinary } from 'cloudinary';
import { mongoose, isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js";

const getVideoById = asyncHandler(async(req,res)=>{

    const { videoId } = req.params

    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"VideoId is not correct to find Video");
    }

    // console.log(videoId);
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video is not found !!")
    }

    const user = await User.findById(req.user?._id)
    console.log(user);
    
    if(!(user.watchHistory.includes(videoId))){
        await Video.findByIdAndUpdate(videoId,{
            $inc:{
                views:1,
            }
        },{
            new:true
        }
    )
    }

    await User.findByIdAndUpdate(req.user?._id,
        {
        $addToSet:{
            watchHistory:videoId
        }
    },{
        new:true
    })


    return res.status(200).json(new ApiResponse(200,video,"Video fetched successfully !!"))

})

const random = asyncHandler(async(req,res)=>{
    try{
        const videos = await Video.aggregate([{$sample:{size:40}}]);
        return res.status(200).json(new ApiResponse(200,videos,"Video successfully !!"))
    }catch(err){
        throw new ApiError(400,"Error in fetching")
    }

})

const getAllVideos = asyncHandler(async(req,res)=>{
    
    const { page = 1, limit = 10, sortBy = "title", sortType = "ascending", userId } = req.query
    const limitNumber = parseInt(limit)
    const pageNumber = parseInt(page)
    const skip = (pageNumber - 1) * limitNumber
    const sortedDirection = sortType === "ascending" ? 1:-1

    if(!isValidObjectId(userId)){
        throw new ApiError(400,"User id is not found!")
    }

    try {
        const videos = await Video.aggregate([
            {
                $match:{
                    owner:new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"_id",
                    foreignField:"_id",
                    as:"owner",
                    pipeline:[
                        {
                            $project:{
                                fullname:1,
                                username:1,
                                avatar:1
                            }
                        }
                    ]
                }
            },{
                $skip:skip
            },
            {
                $limit:limitNumber
            },{
                $sort:{[sortBy]:sortedDirection}
            }
        ])

        const totalVideo = await Video.countDocuments({owner:userId})
        const totalPages = Math.ceil(totalVideo/limitNumber)

        return res
            .status(200)
            .json(
                new ApiResponse(200, { videos, totalPages, totalVideo }, "All videos fetched")
            )

    } catch (error) {
        console.log(error);
        throw new ApiError(400, "Error while fetching videos")
    }
})

const updateVideo = asyncHandler(async(req,res)=>{
    const { videoId } = req.params

    if(!isValidObjectId(videoId)){
        throw new ApiError(401,"Videoid is not proper !")
    }

    const video = await Video.findById(videoId)
    const publicId = video.publicId;

    if(!publicId){
        throw new ApiError(401,"Video is not presnt !!")
    }
    if(publicId){
        try{    
            await cloudinary.uploader.destroy(publicId, { resource_type: 'video' })
        }catch(error){
            throw new ApiError(401,"Video is not deleted !!!")
        }
    }

    const newVideo = req.file?.path
    if(!newVideo){
        throw new ApiError(404,"Video file is required")
    }

    const videoOnCloudinary = await uploadOnCloudinary(newVideo);

    if(!videoOnCloudinary.url){
        throw new ApiError(401,"Error while uploading on cloudinary")
    }

    const updatedVideo = await Video.findByIdAndUpdate(videoId,
        {
            $set: {
                video: videoOnCloudinary.url,
                publicId: videoOnCloudinary.public_id,
                duration: videoOnCloudinary.duration
            }
        },
        {
            new: true
        }
    )
    
    return res.status(200).json(new ApiResponse(200,updateVideo,"Video updated Successfully !!"))

})

const publishVideo = asyncHandler(async(req,res) => {


    const { title,description } = req.body;
    // console.log(title + " title");
    
    if ([ title,description ].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields required");
    }

    const videoFile = req.files?.video[0]?.path;
    const thumbnailFile = req.files?.thumbnail[0]?.path;

    // console.log(videoFile);
    if(!videoFile || !thumbnailFile){
        throw new ApiError(404,"Video is required")
    }

    // console.log(videoFile);
    const videoOnCloudinary = await uploadOnCloudinary(videoFile);
    const thumbnailOnCloudinary = await uploadOnCloudinary(thumbnailFile);
    
    console.log(videoOnCloudinary);
    console.log(thumbnailOnCloudinary);

    if(!videoOnCloudinary || !thumbnailOnCloudinary){
        throw new ApiError(403,"Problem in uploading the video to cloudinary")
    }

    // let owner = await Video.find().populate('owner','username').exec((err,log)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(log);
    //     }
    // })

    const video = await Video.create({
        video:videoOnCloudinary.url,
        thumbnail:thumbnailOnCloudinary.url,
        publicId: videoOnCloudinary.public_id,
        title,
        description,
        duration:videoOnCloudinary.duration,
        owner:req.user?._id,
    })

    const videoUploaded = await Video.findById(video?._id).select("-video -thumbnail -views -isPublished").populate('owner', 'username');
    console.log(videoUploaded);
    
    if (!videoUploaded) {
        throw new ApiError(400, "Video is not Uploaded !")
    }

    return res.status(201)
    .json(
        new ApiResponse(200,videoUploaded,"Video is uploaded properly"

        ))

})

const deleteVideo = asyncHandler(async(req,res)=>{
    

    const { videoId }= req.params;

    const userId = req.user?._id;

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Video-id is not proper !")
    }

    const video = await Video.findById(videoId);


    // for security purpose
    if(String(video.owner) !== String(userId)) {
        throw new ApiError(403, "You are not authorized to delete this video");
    }

    const publicId = video.publicId;
    if(publicId){
        try{
            await cloudinary.uploader.destroy(publicId, { resource_type: 'video' })
        }catch (error) {
            throw new ApiError(400, "error while deleting video file from cloudinary")
        }
    
    }

    await Video.findByIdAndDelete(videoId);

    return res.status(200).json(new ApiResponse(200, [], "Video is deleted successfully !"))


})

 const publishToggle = asyncHandler(async(req,res)=>{
    const {videoId} = req.params

    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(400,"Video id is not proper to publish")
    }

    video.ispublished = !video.ispublished

    const publishStatus = await Video.findByIdAndUpdate(videoId,{
        ispublished:video.ispublished
    },{
        new:true
    }).select("-video -thumbnail -title -description -views -duration -owner")

    return res
        .status(200)
        .json(
            new ApiResponse(200, publishStatus, "If your video was published then now unpublish And if It was unpublished then now published !")
        )

 })

export {
    
    getAllVideos,
    publishVideo,
    deleteVideo,
    updateVideo,
    getVideoById,
    publishToggle,
    random

}
