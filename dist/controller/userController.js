import User from "../models/userModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import bcrypt from "bcryptjs";
// Regiser a user--
export const registerUser = async (req, res, next) => {
    try {
        const { _id, name, email, password, dob, gender } = req.body;
        // Check body data exists or not--
        if (!_id || !name || !email || !dob || !gender) {
            return next(new ErrorHandler("Please enter all field", 400));
        }
        // Check user is already exists--
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("Email already taken", 400));
        }
        // Hash the password--
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user--
        const user = await User.create({
            _id,
            name,
            email,
            password: hashedPassword,
            dob,
            gender,
        });
        // Send response to the user--
        return res.status(201).json({
            message: `Welcome ${user.name}`,
        });
    }
    catch (err) {
        return next(new ErrorHandler("User registration failed", 500));
    }
};
// Get all user--
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            success: true,
            data: users,
        });
    }
    catch (err) {
        return next(new ErrorHandler("Failed to get all users", 500));
    }
};
