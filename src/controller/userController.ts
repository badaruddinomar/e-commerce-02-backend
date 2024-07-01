import { RegisterUserType } from "./../types/type.js";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import bcrypt from "bcryptjs";

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
    res.status(201).json({
      message: `Welcome ${user.name}`,
    });
  } catch (err: any) {
    return next(new ErrorHandler("User registration failed", 500));
  }
};
