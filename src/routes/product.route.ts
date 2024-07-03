import express from "express";
import {
  createProduct,
  getAllCategories,
  getAllProducts,
  getLatestProduct,
  getSingleProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/latest", getLatestProduct);
router.get("/categories", getAllCategories);
router.get("/all", getAllProducts);
router.get("/single/:id", getSingleProduct);

export default router;
