import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  registerUser,
} from "../controller/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.get("/all", getAllUsers);
router.route("/single/:id").get(getSingleUser).delete(deleteUser);

export default router;
