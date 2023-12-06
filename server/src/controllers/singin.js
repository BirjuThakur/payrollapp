import User from "../modals/userSchema.js";
import bcrypt from "bcrypt";

//signin route
export const signin = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const userData = await User.findOne({email});
        if(!userData){
            return res.status(500).send({
                success:false,
                message:"user not found"
            })
        };

        const IsMatch = await bcrypt.compare(password, userData.password);
        
        if(IsMatch){
            if(userData.isAdmin===true){
                const token = await userData.generateToken();
            //for cookie storing
            res.cookie("jwt",token)
            return res.status(200).send({
                success:true,
                message:"admin login successfully",
                userData,
                token:token
            })
            }else{
                const token = await userData.generateToken();
            //for cookie storing
            res.cookie("jwt",token)
                return res.status(200).send({
                    success:true,
                    message:"user login successfully",
                    userData,
                })
            }
        }else{
            return res.status(400).send({
                success:false,
                message:"enter correct details"
            })
        }
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"user login failed",
            error:error.message
        })
    }
}

