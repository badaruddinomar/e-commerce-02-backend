import express from "express";
import { getDashboardStats } from "../controller/stats.controller.js";

const router = express.Router();

router.route("/stats").get(getDashboardStats);

export default router;
