import mongoose from "mongoose";

const userAttendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date:{
        type:String,
    },
    attendance:{
        type:String,
        enum:['present','absent']
    }
});

const UserAttendance = mongoose.model('UserAttendance', userAttendanceSchema);

export default UserAttendance;