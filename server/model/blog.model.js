import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    BlogId:{
        type:mongoose.Schema.Types.ObjectId,
        auto:true
    },
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
    CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    LikedBy:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

export default mongoose.model('Blog',blogSchema);