export const errorMiddleware = (err, req, res, next) => {
    let message;
    message = err.message || "Internal server error";
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
