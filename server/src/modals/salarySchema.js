import mongoose from "mongoose";

const userSalarySchema = new mongoose.Schema({
    // foren key 
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
month:{
    type:String,
},
totalSalry:{
    type:Number
},
uchalSalary:{
    type:Number
},
remaningSalary:{
    type:Number
}
});

const UserSalary = mongoose.model('UserSalary',userSalarySchema);

export default UserSalary;