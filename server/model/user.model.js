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
            type:String
        }]
})

export default mongoose.model("User",userSchema);