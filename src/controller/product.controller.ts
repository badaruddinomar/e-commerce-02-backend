import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import {
  NewProductType,
  SearchBaseQueryType,
  SearchRequestQueryType,
} from "../types/type.js";
import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";

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
    // upload image to cloudinary--
    // const cloudinaryRes = await cloudinary.uploader.upload(photo);

    // const photoObj = {
    //   public_id: cloudinaryRes.public_id,
    //   url: cloudinaryRes.secure_url,
    // };

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
      newProduct,
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
      latestProduct,
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
      categories,
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
      products,
    });
  } catch (err) {
    return next(new ErrorHandler(`Failed to get products`, 500));
  }
};

// Get single product--
export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return next(new ErrorHandler(`Failed to get product`, 500));
  }
};

// Update single product--
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get product id--
    const { id } = req.params;
    // Find product--
    const product = await Product.findById(id);
    // Check if product exists
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    // Update product--
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    // Send response to the user--
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to update product", 500));
  }
};
// Delete product--
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get product id--
    const { id } = req.params;
    // Find product--
    const product = await Product.findById(id);
    // Check if product exists
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    // Delete product--
    await Product.findByIdAndDelete(id);
    // Send response to the user--
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to delete product", 500));
  }
};

// Search products--
export const searchProducts = async (
  req: Request<{}, {}, {}, SearchRequestQueryType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE || 10);
    const skip = (page - 1) * limit;

    const baseQuery: SearchBaseQueryType = {};
    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }
    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }
    if (category) {
      baseQuery.category = category;
    }

    const products = await Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const totalProducts = await Product.countDocuments(baseQuery);
    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      success: true,
      products,
      totalPages,
      totalProducts,
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to search products", 500));
  }
};
