import dotenv from "dotenv"

dotenv.config();

import jwt from "jsonwebtoken"

const verifyJwt = async(req,res,next) =>{
    const token = req.cookies.jwtToken;

    if(!token){
        return res.status(401).json({message:"Unauthorized User, Token Missing"});
    }

    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log("Error in jwt token",error);
        return res.status(401).json({message:"Invalid or expired Token"});
    }

}

export default verifyJwt;