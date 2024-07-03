import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/product.model.js";
export const createProduct = async (req, res, next) => {
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
    }
    catch (err) {
        return next(new ErrorHandler(`Failed to create product`, 500));
    }
};
// Get latest product--
export const getLatestProduct = async (req, res, next) => {
    try {
        // Get the latest product--
        const latestProduct = await Product.findOne()
            .sort({ createdAt: -1 })
            .limit(5);
        return res.status(200).json({
            success: true,
            data: latestProduct,
        });
    }
    catch (err) {
        return next(new ErrorHandler(`Failed to get latest product`, 500));
    }
};
// Get all category--
export const getAllCategories = async (req, res, next) => {
    try {
        // Get all categories--
        const categories = await Product.distinct("category");
        return res.status(200).json({
            success: true,
            data: categories,
        });
    }
    catch (err) {
        return next(new ErrorHandler(`Failed to get categories`, 500));
    }
};
// Get all products--
export const getAllProducts = async (req, res, next) => {
    try {
        // Get all products--
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (err) {
        return next(new ErrorHandler(`Failed to get products`, 500));
    }
};
// Get single product--
export const getSingleProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: product,
        });
    }
    catch (err) {
        return next(new ErrorHandler(`Failed to get product`, 500));
    }
};
// Update single product--
export const updateProduct = async (req, res, next) => {
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
            data: updatedProduct,
        });
    }
    catch (err) {
        return next(new ErrorHandler("Failed to update product", 500));
    }
};
// Delete product--
export const deleteProduct = async (req, res, next) => {
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
    }
    catch (err) {
        return next(new ErrorHandler("Failed to delete product", 500));
    }
};
