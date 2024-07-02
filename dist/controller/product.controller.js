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
