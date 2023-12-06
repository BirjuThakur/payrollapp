import User from "../modals/userSchema.js";
import { forgotOtp } from "../pages/nodemailer/forgototp.js";

//generate otp 
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}

export const forgotPass = async(req,res) =>{
try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(500).send({
          success: false,
          message: "User not found",
        });
      }
  
    const otp = generateOTP();
    // save otp
    user.otp = otp;
    await user.save();
    // send otp via mail 
    const emailText = `${otp}`;
    await forgotOtp(email, emailText);

    res.status(200).send({
        success: true,
        message: "otp send on your mail, please check your mail",
        user
    });

} catch (error) {
     res.status(500).send({
        success: false,
        message: "user not registered",
        error:error.message
    })
}
}

