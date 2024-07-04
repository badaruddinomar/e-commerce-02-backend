import express from "express";
import { createOrder, myOrders } from "../controller/order.controller.js";

const router = express();

router.route("/create").post(createOrder);
router.route("/my/:id").get(myOrders);

export default router;
