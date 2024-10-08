import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2' //1-step

const videoSchema = new Schema({
    video:{
        type:String,
        required :true,
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,    
        required:true
    },
    publicId: {
        type: String, //cloudinary
    },
    views:{
        type:Number,
        default:0
    },
    ispublished:{
        type:Boolean,
        default:true,    
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    
},

    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate) //2 step , :---- we can wite aggregation pipeline query

export const Video = mongoose.model("Video",videoSchema)