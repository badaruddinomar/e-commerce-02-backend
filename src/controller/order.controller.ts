import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.js";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    return next(new ErrorHandler("Failed to create order", 500));
  }
};
