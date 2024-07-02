import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  registerUser,
} from "../controller/userController.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/register", registerUser);
router.get("/all", protectRoute, getAllUsers);
router.route("/single/:id").get(getSingleUser).delete(protectRoute, deleteUser);

export default router;
