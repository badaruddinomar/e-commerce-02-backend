import express from "express";
import {
  createProduct,
  getAllCategories,
  getAllProducts,
  getLatestProduct,
  getSingleProduct,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/latest", getLatestProduct);
router.get("/categories", getAllCategories);
router.get("/all", getAllProducts);
router.route("/single/:id").get(getSingleProduct).patch(updateProduct);

export default router;
