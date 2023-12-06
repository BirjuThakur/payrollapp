import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const URI = process.env.MONGOURI;
 
const dbConnection = () =>{
    mongoose.connect(URI).then(()=>{console.log('connection successfully')})
    .catch(()=>{console.log('connection dismiss')})
};

export default dbConnection;