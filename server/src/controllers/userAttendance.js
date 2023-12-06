import UserAttendance from "../modals/userAttendanceSchema.js";
import User from "../modals/userSchema.js";

export const createAttendance = async(req,res) =>{
    try {
        const {user,date,attendance} = req.body;
        const response = new UserAttendance({
            user,date,attendance
        });
        const saveresponse = await response.save();
        res.status(201).send({
            success:true,
            message:"attendace creating successfully",
            saveresponse
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"error in userattendance",
            error:error.message
        })
    }
}

export const singleAttendance = async(req,res) =>{
    try {
        const {userid} = req.params;
        
        const response = await UserAttendance.findById(userid).populate('user');
        res.status(200).send({
            success:true,
            message:"attendace got successfully",
            response
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"error in userattendance",
            error:error.message
        })
    }
}

export const allAttendance = async(req,res) =>{
    try {
        const { page = 1, limit = 10, date,attendance,name } = req.query;
        
        // Build the query based on parameters
        const query = {};
        if (date) {
            query.date = date;
        }
        
        if (attendance) {
            query.attendance = attendance;
        }

        if (name) {
            // Assuming 'user' field in UserAttendance is ObjectId
            const users = await User.find({ name: new RegExp(name, 'i') }, '_id');
            query.user = { $in: users.map(user => user._id) };
        }

        // Count total number of users for pagination
        const totalUsersAttendance = await UserAttendance.countDocuments(query);

        const response = await UserAttendance.find(query).skip((page - 1) * limit)
        .limit(limit).populate('user');

        const totalPages = Math.ceil(totalUsersAttendance / limit);
        
        res.status(200).send({
            success:true,
            message:"attendace got successfully",
            response,
            totalPages,
            currentPage: parseInt(page),
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"error in userattendance",
            error:error.message
        })
    }
}

export const updateAttendance = async(req,res) =>{
    try {
        const {userid} = req.params;
        const {user,date,attendance} = req.body;
        const response = await UserAttendance.findByIdAndUpdate(userid,{
            user,date,attendance
        },{new:true});
        res.status(200).send({
            success:true,
            message:"attendace updated successfully",
            response
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"error in userattendance",
            error:error.message
        })
    }
}

export const deleteAttendance = async(req,res) =>{
    try {
        const {userid} = req.params;
        const response = await UserAttendance.findByIdAndDelete(userid).populate('user');
        res.status(200).send({
            success:true,
            message:"attendace deleted successfully",
            response
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"error in userattendance",
            error:error.message
        }) 
    }
}