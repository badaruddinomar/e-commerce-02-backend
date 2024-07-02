import express from "express";
import { createProduct, getLatestProduct, } from "../controller/product.controller.js";
const router = express.Router();
router.post("/create", createProduct);
router.get("/latest", getLatestProduct);
export default router;
