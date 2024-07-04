import express from "express";
import { createOrder } from "../controller/order.controller.js";

const router = express();

router.route("/create").post(createOrder);

export default router;
