import UserSalary from "../modals/salarySchema.js";
import User from "../modals/userSchema.js";

export const createSalary = async (req, res) => {
    try {
        const { user, month, totalSalry, uchalSalary, remaningSalary } = req.body;
        // Ensure totalSalary and uchalSalary are numbers
        const totalSalaryNum = parseFloat(totalSalry);
        const uchalSalaryNum = parseFloat(uchalSalary);

        const remainingSalary = totalSalaryNum - uchalSalaryNum;

        const response = new UserSalary({
            user,
            month,
            totalSalry: totalSalaryNum,
            uchalSalary: uchalSalaryNum,
            remaningSalary: remainingSalary,
        });
        const savesalary = await response.save();
        res.status(201).send({
            success: true,
            message: "user salary created successfully",
            savesalary
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in usersalary",
            error: error.message
        })
    }
}

export const singleSalary = async (req, res) => {
    try {
        const { userid } = req.params;
        const response = await UserSalary.findById(userid).populate('user');
        res.status(200).send({
            success: true,
            message: "user salary got successfully",
            response
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in usersalary",
            error: error.message
        })
    }
}

export const allSalary = async (req, res) => {
    try {
        const { page = 1, limit = 10, name, month } = req.query;
        // Build the query based on parameters
        const query = {};
        if (name) {
            // Use the 'name' parameter to search in the 'user' field
            const users = await User.find({ name: new RegExp(name, 'i') }, '_id');
            query.user = { $in: users.map(user => user._id) };
        }
        if (month) {
            query.month = month;
        }

        // Count total number of records for pagination
        const totalRecords = await UserSalary.countDocuments(query);

        const response = await UserSalary.find(query).skip((page - 1) * limit)
        .limit(limit).populate('user');

        const totalPages = Math.ceil(totalRecords / limit);

        res.status(200).send({
            success: true,
            message: "user salary got successfully",
            response,
            totalPages,
            currentPage: parseInt(page),
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in usersalary",
            error: error.message
        })
    }
}

export const updateSalary = async (req, res) => {
    try {
        const { userid } = req.params;
        const { user, month, totalSalry, uchalSalary, remaningSalary } = req.body;
        // Ensure totalSalary and uchalSalary are numbers
        const totalSalaryNum = parseFloat(totalSalry);
        const uchalSalaryNum = parseFloat(uchalSalary);

        const remainingSalary = totalSalaryNum - uchalSalaryNum;

        const response = await UserSalary.findByIdAndUpdate(userid, {
            user,
            month,
            totalSalry: totalSalaryNum,
            uchalSalary: uchalSalaryNum,
            remaningSalary: remainingSalary,
        }, { new: true }).populate('user');

        res.status(200).send({
            success: true,
            message: "User salary updated successfully",
            response,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in usersalary",
            error: error.message
        })
    }
}

export const deleteSalary = async (req, res) => {
    try {
        const { userid } = req.params;
        const response = await UserSalary.findByIdAndDelete(userid).populate('user');
        res.status(200).send({
            success: true,
            message: "user salary deleted successfully",
            response
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in usersalary",
            error: error.message
        })
    }
}