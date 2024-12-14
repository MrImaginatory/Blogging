// const secretKey = process.env.SECRETKEY;
import jwt from "jsonwebtoken"

const verifyJwt = async(req,res,next) =>{
    const token = req.cookies.jwtToken;

    if(!token){
        return res.status(401).json({message:"Unauthorized User, Token Missing"});
    }

    try {
        const decodedToken = jwt.verify(token,'testKey');
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log("Error in jwt token",error);
        return res.status(401).json({message:"Invalid or expired Token"});
    }

}

export default verifyJwt;