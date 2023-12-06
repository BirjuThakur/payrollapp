import User from "../modals/userSchema.js";

export const resetPass = async (req, res) => {
    try {
            const { userid } = req.params;
            
            const { otp, newpass, confirmPassword } = req.body;
    
            if (!otp || !newpass || !confirmPassword) {
                return res.status(400).send({
                    success: false,
                    message: "OTP, new password, and confirm password are required",
                });
            }
    
            const user = await User.findById(userid);

            // Check if the provided OTP matches the OTP stored in the user document
            if (user.otp && user.otp.toString() !== otp.toString()) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid OTP",
                });
            }
    
            // Reset OTP and update the password
            user.otp = null;
            user.password = newpass;
    
            if (confirmPassword !== newpass) {
                return res.status(400).send({
                    success: false,
                    message: "Password not matching",
                });
            }
    
            await user.save();
    
            res.status(201).send({
                success: true,
                message: "User password changed successfully",
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
}

