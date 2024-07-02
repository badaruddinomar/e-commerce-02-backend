import express from "express";
import {
  createProduct,
  getAllCategories,
  getAllProducts,
  getLatestProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/latest", getLatestProduct);
router.get("/categories", getAllCategories);
router.get("/all", getAllProducts);

export default router;
