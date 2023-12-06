import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name should be required"]
    },
    email: {
        type: String,
        required: [true, "email should be required"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "phone number should be required"]
    },
    password: {
        type: String,
        required: [true, "password should be required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number
    },
    token: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now(),
    },
}, { timestamps: true });

//password hashing 
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

//creating jasonwebtoken
userSchema.methods.generateToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        this.token = token;
        await this.save();
        return token;
    } catch (error) {
        console.error('Error in token creation:', error);
        return undefined;
    }
}

const User = mongoose.model('User', userSchema);

export default User;