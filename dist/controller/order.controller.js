import ErrorHandler from "../utils/errorHandler.js";
import Order from "../models/order.models.js";
import User from "../models/user.model.js";
import { reduceStock } from "../utils/feature.js";
// Create new order api--
export const createOrder = async (req, res, next) => {
    try {
        // Get order request data--
        const { shippingInfo, products, user, subtotal, tax, shippingCharges, total, } = req.body;
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
        // reduce stock--
        await reduceStock(products);
        // Send response to the user--
        return res.status(201).json({
            success: true,
            data: order,
            message: "Order created successfully",
        });
    }
    catch (err) {
        return next(new ErrorHandler("Failed to create order", 500));
    }
};
// My orders api--
export const myOrders = async (req, res, next) => {
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
    }
    catch (err) {
        return next(new ErrorHandler("Failed to get orders", 500));
    }
};
export const allOrders = async (req, res, next) => {
    try {
        // Get all orders--
        const orders = await Order.find().populate("user", "name");
        // Send response to the user--
        return res.status(200).json({
            success: true,
            data: orders,
        });
    }
    catch (err) {
        return next(new ErrorHandler("Failed to get orders", 500));
    }
};
export const getSingleOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: order,
        });
    }
    catch (err) {
        return next(new ErrorHandler("Failed to get order", 500));
    }
};
export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
    }
    catch (err) {
        return next(new ErrorHandler("Failed to delete order", 500));
    }
};
export const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
        });
    }
    catch (err) {
        return next(new ErrorHandler("Failed to update order status", 500));
    }
};
