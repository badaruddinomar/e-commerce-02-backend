import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  getLatestProduct,
  getSingleProduct,
  searchProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/latest", getLatestProduct);
router.get("/categories", getAllCategories);
router.get("/all", getAllProducts);
router
  .route("/single/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
router.get("/search", searchProducts);

export default router;
