import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import { NewOrderType } from "../types/type.js";
import Order from "../models/order.models.js";
import User from "../models/user.model.js";

// Create new order api--
export const createOrder = async (
  req: Request<{}, {}, NewOrderType>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get order request data--
    const {
      shippingInfo,
      products,
      user,
      subtotal,
      tax,
      shippingCharges,
      total,
    } = req.body;
    // Check all data exists or not--
    if (!shippingInfo || !products || !user || !subtotal || !tax || !total) {
      return next(new ErrorHandler("Please enter all required fields", 400));
    }
    // Create order--
    const order = await Order.create({
      shippingInfo,
      products,
      user,
      subtotal,
      tax,
      shippingCharges,
      total,
    });
    // Send response to the user--
    return res.status(201).json({
      success: true,
      data: order,
      message: "Order created successfully",
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to create order", 500));
  }
};

// My orders api--
export const myOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get user id--
    const { id } = req.params;
    // Find the user---
    const user = await User.findById(id);
    // Check user exists or not--
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    // Find users orders--
    const orders = await Order.find({ user: id });
    // Send response to the user--
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to get orders", 500));
  }
};
