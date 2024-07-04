import ErrorHandler from "../utils/errorHandler.js";
import Coupon from "../models/coupon.js";
export const createCoupon = async (req, res, next) => {
    try {
        const { coupon, amount } = req.body;
        if (!coupon || !amount) {
            return next(new ErrorHandler("Please provide all field", 400));
        }
        await Coupon.create({ coupon, amount });
        return res.status(201).json({
            success: true,
            message: "Coupon code created successfully",
        });
    }
    catch (err) {
        return next(new ErrorHandler("Failed to create coupon code", 500));
    }
};
