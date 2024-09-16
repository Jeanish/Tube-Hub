import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";   
import { User } from "../models/user.model";
import { Comment } from "../models/comments.models";
import { Video } from "../models/video.model";  
import mongoose from "mongoose";

const addComment = asyncHandler(async(req,res)=>{
    
    const {videoId} = req.params
    const {content} = req.body

    if(!req.user?._id){
        throw new ApiError(404,"requested user Id is not found !!")
    }

    const user = await User.findById(req.user?._id)

    if(!isValidObjectId(user)){
        throw new ApiError(404, "User not found with this User Id")
    }

    if(content.trim() === ""){
        throw new ApiError(400,"content is required")
    }

    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"video Id is not available")
    }

    const video = await Video.findById(videoId)

    if(!video){
        throw new  ApiError(404,"Video not found !!")
    }

    const comment = await Comment.create({
        content:content,
        owner:req.user?._id,
        video:videoId
    })


    return res
        .status(200)
        .json(
            new ApiResponse(200, comment, "Comment added Sucessfully!")
        )

})

export {
    addComment
}

