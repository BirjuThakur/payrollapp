import User from "../modals/userSchema.js";

//signout
export const signout = async (req, res) => {
    try {
        if (req.cookies.jwt) {
            const token = req.cookies.jwt;
            // Clear the cookie
            res.clearCookie("jwt");

            const user = await User.findOne({ token });

            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: "User not found"
                });
            }

            user.token = null;
            await user.save();

            return res.status(200).send({
                success: true,
                message: "user logout successfully",
                user
            })
        } 
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "user not logout",
            error:error.message
        })
    }
}

