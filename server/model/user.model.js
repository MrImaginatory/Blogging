import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        min:2,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    blogsId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
    }],
    follows:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }],
    isVerified:{
        type:Boolean,
        default:false,
        required:true,
    },
    gender:{
        type:String,
        enum:["Male","Female","Others"],
    }
})

export default mongoose.model("User",userSchema);