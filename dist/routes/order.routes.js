import express from "express";
import { allOrders, createOrder, deleteOrder, getSingleOrder, myOrders, } from "../controller/order.controller.js";
const router = express();
router.route("/create").post(createOrder);
router.route("/my/:id").get(myOrders);
router.route("/all").get(allOrders);
router.route("/single/:id").get(getSingleOrder).delete(deleteOrder);
export default router;
