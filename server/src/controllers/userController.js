import User from "../modals/userSchema.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, password } = req.body;
        const response = new User({
            name, email, phoneNumber, password
        });
        const saveUser = await response.save();
        res.status(201).send({
            success: true,
            message: "user created successfully",
            saveUser
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in user",
            error: error.message
        })
    }
}

export const singleUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const response = await User.findById(userid);
        console.log('Response:', response);
        res.status(201).send({
            success: true,
            message: "user got successfully",
            response
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in user",
            error: error.message
        })
    }
}

export const allUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, name } = req.query;

        // Build the query based on the name parameter
        const query = name ? { name: { $regex: new RegExp(name), $options: 'i' } } : {};

        // Perform pagination
        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        // Count total number of users for pagination
        const totalUsers = await User.countDocuments(query);

        const totalPages = Math.ceil(totalUsers / limit);

        res.status(201).send({
            success: true,
            message: "user got successfully",
            users,
            totalPages,
            currentPage: parseInt(page),
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in user",
            error: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const { name, email, phoneNumber, password } = req.body;
        const response = await User.findByIdAndUpdate(userid, {
            name, email, phoneNumber, password
        }, { new: true })
        res.status(201).send({
            success: true,
            message: "user updated successfully",
            response
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in user",
            error: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const response = await User.findByIdAndDelete(userid);
        res.status(201).send({
            success: true,
            message: "user deleted successfully",
            response
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in user",
            error: error.message
        })
    }
}