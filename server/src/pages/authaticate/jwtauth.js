import User from "../../modals/userSchema.js";
import jwt from "jsonwebtoken";

export const jwtAuth = async(req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        //verify user
        const verifyUser = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById({_id:verifyUser._id.toString()},token);
        if(!user){
            return res.status(500).send({
                success:false,
                message:"user not found",
            })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"user not authanticate, please login",
            error
        })
    }
}

