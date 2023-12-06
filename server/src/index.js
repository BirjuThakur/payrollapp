import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 5000 ;
import cors from "cors";
import cookieParser from 'cookie-parser';
import dbConnection from "./db/dbConnection.js";
import userRoute from "./routes/userRoute.js";
import userAttendanceRoute from "./routes/userAttendance.js";
import userSalaryRoute from "./routes/userSalaryRoute.js";

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes 
app.use("/user",userRoute);
app.use("/userattendance",userAttendanceRoute);
app.use("/usersalary",userSalaryRoute);

app.get("/",(req,res) =>{
    res.send("welocme user")
});

app.listen(port,()=>{
    dbConnection();
    console.log(`app is running on ${port} port`)
})