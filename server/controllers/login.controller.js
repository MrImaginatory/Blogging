import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import transporter from "../utils/nodemailer.util.js";
import verificationEmail from "../emailTemplates/verifyTemplate.js";

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

        const token = jwt.sign({userid:user._id,email:user.emailId,isVerified:user.isVerified},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});

        res.cookie("jwtToken", token, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: "strict",
                                    maxAge: 60 * 60 * 1000,})
                                    .status(200)
                                    .json({message:"Logged Successfully"});

    }catch(error){
        console.log("Error in LoginController:",error);
        return res.status(400).json({message:"Error logging In"});
    }
}

const signupController = async(req,res) => {
    try {
        const { userName , email , password } = req.body;

        const existingUser = await User.findOne({$or:[{userName},{email}]});

        if(existingUser){
           return res.status(403).json({message:"User Already Exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const userData = {
            userName: userName,
            emailId: email,
            password: hashedPassword,
        }

        const newUser = new User(userData);
        await newUser.save();

        if(!newUser||newUser.length===0){
            return res.status(401).json({message:"Error Creating User"})
        }

        const verifyEmailURL = `http://localhost:3001/authentication/verify/${newUser._id}`;
        const verifyTemp = verificationEmail(newUser.userName,verifyEmailURL);
        const verifyEmailInfo = await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:newUser.emailId,
            subject:'Verification Related Email',
            html: `${verifyTemp}`,
        })

        if(!verifyEmailInfo){
            const deleteUser = await User.findByIdAndDelete(newUser._id);
            console.log(deleteUser);
            return res.status(401).json({message:"Error Creating User!"});
        }

        console.log(verifyEmailInfo);
        
        return res.status(201).json({message:"user Created Successfully Please Verify Yourself through Email!"});

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
        .json({message:"User LoggedOut Successfully"});
    } catch (error) {
        console.error("Error Logging out:",error);
    }
}

const verifyController = async(req,res)=>{
    try {
        const {id} = req.params;

        const userData = await User.findById(id);

        if(!userData || userData.length){
            return res.status(404).json({message:"User Not Found!"});
        }

        if(userData.isVerified){
            return res.status(301).json({message:"User Already Verified. Redirecting user"});
        }

        const verifyUser = await User.findByIdAndUpdate(id,{isVerified:true},{new:true});

        if(!verifyUser||verifyUser.length===0){
            return res.status(401).json({message:"Error verifying user try later"});
        }

        return res.status(200).json({message:"User Verified Successfully"});

    } catch (error) {
        console.log("Error verifying User");
        return res.status(401).json({message:"Error verifying user try later"});
    }
}

export {loginController,signupController,logoutController,verifyController}