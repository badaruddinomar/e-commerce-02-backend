import jwt from "jsonwebtoken";
export const sendToken = (user, res, statusCode, message = null) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
    // option for cookie--
    const options = {
        httpOnly: true,
        expiresIn: process.env.JWT_COOKIE_EXPIRATION,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
        message,
    });
};
