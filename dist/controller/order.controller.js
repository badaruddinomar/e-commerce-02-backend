import ErrorHandler from "../utils/errorHandler.js";
export const createOrder = async (req, res, next) => {
    try {
    }
    catch (err) {
        return next(new ErrorHandler("Failed to create order", 500));
    }
};
