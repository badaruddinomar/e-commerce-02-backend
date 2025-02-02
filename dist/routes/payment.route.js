import express from "express";
import { allCoupon, applyDiscount, createCoupon, deleteCoupon, } from "../controller/payment.controller.js";
const router = express.Router();
router.route("/create-coupon").post(createCoupon);
router.route("/apply-discount").get(applyDiscount);
router.route("/all-coupon").get(allCoupon);
router.delete("/coupon/:id", deleteCoupon);
export default router;
