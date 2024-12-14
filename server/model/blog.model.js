import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    BlogTitle:{
        type:String,
        required:true,
        min:5
    },
    BlogDescription:{
        type:String,
        required:true,
    },
    BlogImage:{
        type:String,
    },
    BlogImagePath:{
        type:String,
    },
    CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    UploadedAt:{
        type:Date,
        default:Date.now,
    }
    ,
    LikedBy:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

export default mongoose.model('Blog',blogSchema);