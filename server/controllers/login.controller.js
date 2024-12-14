import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// const secretKey = process.env.SECRETKEY;

const loginController = async(req,res) => {
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId});
        
        if(!user){
            res.status(404).json({message:"User Not Found"})
        }
        
        const matched = await bcrypt.compare(password,user.password);
        if(!matched){
            res.status(400).json({message:"Invalid Email or Password!"})
        }

        const token = jwt.sign({userid:user._id,email:user.emailId},'testKey',{expiresIn:"1h"});

        res.cookie("jwtToken", token, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: "strict",
                                    maxAge: 60 * 60 * 1000,})
                                    .status(200)
                                    .json({message:"Logged Successfully"});

    }catch(error){
        console.log("Error in LoginController:",error);
        res.status(400).json({message:"Error logging In"});
    }
}

const signupController = async(req,res) => {
    try {
        const { userName , email , password } = req.body;

        const existingUser = await User.findOne({$or:[{userName},{emailId:email}]});

        if(existingUser){
            res.status(403).json({message:"User Already Exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const userData = {
            userName: userName,
            emailId: email,
            password: hashedPassword,
        }

        const newUser = new User(userData);
        await newUser.save();

        res.status(201).json({message:"user Created Successfully"})

    } catch (error) {
        console.log("Error in signupController:",error);
        res.status(400).json({message:"Error logging In"})
    }
}

const logoutController  = async(req,res) => {
    try {
        res.cookie("jwtToken","",{
            httpOnly:true,
            secure:true,
            maxAge:(60*3600)
        })
        .status(200)
        .json({message:"User LoggedOut Successfully"})
    } catch (error) {
        console.error("Error Logging out:",error);
        
    }
}

export {loginController,signupController,logoutController}