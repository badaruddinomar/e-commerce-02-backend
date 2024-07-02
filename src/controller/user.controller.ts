import { RegisterUserType } from "./../types/type.js";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";

// Regiser a user--
export const registerUser = async (
  req: Request<{}, {}, RegisterUserType>,
  res: Response,
  next: NextFunction
) => {
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
  } catch (err: any) {
    return next(new ErrorHandler("User registration failed", 500));
  }
};
// Get all user--
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to get all users", 500));
  }
};
// Get single user--
export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return next(new ErrorHandler("User does not exists", 400));
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to get all user", 500));
  }
};
// Delete single user--
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return next(new ErrorHandler("User does not exist", 400));
    }
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to delete user", 500));
  }
};
