import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utilityClass.js";
import User from "../models/userModel.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the user id--
  const { id } = req.query;
  // Throw error id not exists--
  if (!id) {
    return next(new ErrorHandler(`You are not permited`, 401));
  }
  // Get the user--
  const user = await User.findById(id);
  // Throw error if user not exists--
  if (!user) {
    return next(new ErrorHandler("You are not permited!", 401));
  }
  // Throw error if not admin--
  if (user.role !== "admin") {
    return next(new ErrorHandler("You are not permited!", 401));
  }
  next();
};
