import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    coupon: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, "Discount amount is required"],
      min: 0,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
