import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/utilityClass.js";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message;
  message = err.message || "Internal server error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
