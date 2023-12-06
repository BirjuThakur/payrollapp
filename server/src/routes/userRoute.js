import express from "express";
import { allUsers, createUser, deleteUser, singleUser, updateUser } from "../controllers/userController.js";
import { signin } from "../controllers/singin.js";
import { signout } from "../controllers/signout.js";
import { forgotPass } from "../controllers/forgotpass.js";
import { resetPass } from "../controllers/resetpass.js";
const userRoute = express.Router();

userRoute.post("/createuser",createUser);

userRoute.get("/singleuser/:userid",singleUser);

userRoute.get("/allusers",allUsers);

userRoute.put("/updateuser/:userid",updateUser);

userRoute.delete("/deleteuser/:userid",deleteUser);

// signin
userRoute.post("/signin",signin);

// signout
userRoute.get("/signout",signout);

// forgot password otp
userRoute.post("/forgotpass",forgotPass);

// reset password 
userRoute.post("/resetpass/:userid",resetPass);

export default userRoute;