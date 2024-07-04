import ErrorHandler from "../utils/errorHandler.js";
import Order from "../models/order.models.js";
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
