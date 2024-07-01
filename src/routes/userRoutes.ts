import express from "express";
import {
  getAllUsers,
  getSingleUser,
  registerUser,
} from "../controller/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.get("/all", getAllUsers);
router.get("/single/:id", getSingleUser);

export default router;
