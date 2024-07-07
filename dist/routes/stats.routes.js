import express from "express";
import { getDashboardStats, getPieCharts, } from "../controller/stats.controller.js";
const router = express.Router();
router.route("/stats").get(getDashboardStats);
router.route("/pie-charts").get(getPieCharts);
export default router;
