import express from "express";
import { allSalary, createSalary, deleteSalary, singleSalary, updateSalary } from "../controllers/userSalary.js";
const userSalaryRoute = express.Router();

userSalaryRoute.post('/createsalary',createSalary);

userSalaryRoute.get("/singlesalary/:userid",singleSalary);

userSalaryRoute.get("/allsalary",allSalary);

userSalaryRoute.put("/updatesalary/:userid",updateSalary);

userSalaryRoute.delete("/deletesalary/:userid",deleteSalary);

export default userSalaryRoute;