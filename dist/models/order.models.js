import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please enter address"],
        },
        city: {
            type: String,
            required: [true, "Please enter city"],
        },
        pincode: {
            type: Number,
            required: [true, "Please enter pin code"],
        },
        state: {
            type: String,
            required: [true, "Please enter state"],
        },
        country: {
            type: String,
            required: [true, "Please enter country"],
        },
    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: [true, "Please enter user ID"],
    },
    subtotal: {
        type: Number,
        required: [true, "Please enter subtotal"],
    },
    tax: {
        type: Number,
        required: [true, "Please enter tax"],
    },
    shippingCharges: {
        type: Number,
        required: [true, "Please enter shipping charges"],
    },
    total: {
        type: Number,
        required: [true, "Please enter total"],
    },
    discount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Please enter product ID"],
            },
            name: {
                type: String,
                required: [true, "Please enter product name"],
            },
            photo: {
                type: String,
                required: [true, "Please enter product photo"],
            },
            price: {
                type: Number,
                required: [true, "Please enter product price"],
            },
            quantity: {
                type: Number,
                required: [true, "Please enter quantity"],
            },
        },
    ],
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);
export default Order;
