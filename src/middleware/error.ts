import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.js";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message;
  if (err.name === "CastError") err.message = "Invalid ID";
  message = err.message || "Internal server error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
