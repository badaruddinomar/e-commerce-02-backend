import express from "express";
import { createCoupon } from "../controller/payment.controller.js";

const router = express.Router();

router.route("/create-coupon").post(createCoupon);

export default router;
