import express from "express";
import {
  allOrders,
  createOrder,
  myOrders,
} from "../controller/order.controller.js";

const router = express();

router.route("/create").post(createOrder);
router.route("/my/:id").get(myOrders);
router.route("/all").get(allOrders);

export default router;
