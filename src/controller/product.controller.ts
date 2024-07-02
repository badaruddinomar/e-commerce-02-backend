import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import { NewProductType } from "../types/type.js";
import Product from "../models/product.model.js";

export const createProduct = async (
  req: Request<{}, {}, NewProductType>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the data--
    const { name, price, category, stock, photo } = req.body;
    // Throw error if all field not provided--
    if (!name || !price || !category || !stock || !photo) {
      return next(new ErrorHandler("Please provide all fields", 400));
    }
    // Create a new product--
    const newProduct = await Product.create({
      name,
      price,
      category,
      stock,
      photo, // TODO: add cloudinary--
    });

    // Send response to the user--
    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    return next(new ErrorHandler(`Failed to create product`, 500));
  }
};
// Get latest product--
export const getLatestProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the latest product--
    const latestProduct = await Product.findOne()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: latestProduct,
    });
  } catch (err) {
    return next(new ErrorHandler(`Failed to get latest product`, 500));
  }
};
// Get all category--
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get all categories--
    const categories = await Product.distinct("category");

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    return next(new ErrorHandler(`Failed to get categories`, 500));
  }
};
// Get all products--
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get all products--
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    return next(new ErrorHandler(`Failed to get products`, 500));
  }
};
