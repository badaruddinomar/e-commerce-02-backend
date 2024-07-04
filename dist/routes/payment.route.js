import express from "express";
import { applyDiscount, createCoupon, } from "../controller/payment.controller.js";
const router = express.Router();
router.route("/create-coupon").post(createCoupon);
router.route("/apply-discount").get(applyDiscount);
export default router;
