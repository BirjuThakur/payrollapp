import express from "express";
import { allAttendance, createAttendance, deleteAttendance, singleAttendance, updateAttendance } from "../controllers/userAttendance.js";
const userAttendanceRoute = express.Router();

userAttendanceRoute.post("/createattendace",createAttendance);

userAttendanceRoute.get("/singleattendance/:userid",singleAttendance);

userAttendanceRoute.get("/allattendance",allAttendance);

userAttendanceRoute.put("/updateattendance/:userid",updateAttendance);

userAttendanceRoute.delete("/deleteattendance/:userid",deleteAttendance);

export default userAttendanceRoute;