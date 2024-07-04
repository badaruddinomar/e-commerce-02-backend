import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import { NewCouponCodeType } from "../types/type.js";
import Coupon from "../models/coupon.js";

export const createCoupon = async (
  req: Request<{}, {}, NewCouponCodeType>,
  res: Response,
  next: NextFunction
) => {
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
  } catch (err) {
    return next(new ErrorHandler("Failed to create coupon code", 500));
  }
};

export const applyDiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { coupon } = req.query;
    const discount = await Coupon.findOne({ coupon });
    if (!discount) {
      return next(new ErrorHandler("Invalid coupon code", 400));
    }
    return res.status(200).json({
      success: true,
      discount: discount.amount,
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to create coupon", 500));
  }
};

export const allCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coupons = await Coupon.find({});
    return res.status(200).json({
      success: true,
      coupons,
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to get coupons", 500));
  }
};
