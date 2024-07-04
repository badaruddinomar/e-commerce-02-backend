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
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createProduct);
router.get("/latest", getLatestProduct);
router.get("/categories", getAllCategories);
router.get("/all", getAllProducts);
router
  .route("/single/:id")
  .get(getSingleProduct)
  .patch(protectRoute, updateProduct)
  .delete(protectRoute, deleteProduct);
router.get("/search", searchProducts);

export default router;
