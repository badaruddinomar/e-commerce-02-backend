import express from "express";
import { getAllUsers, registerUser } from "../controller/userController.js";
const router = express.Router();
router.post("/register", registerUser);
router.get("/all", getAllUsers);
export default router;
