import { Router } from "express";
import { authenticate, allowRoles } from "../middleware/auth.js";
import { getDashboardStats } from "../controllers/statsController.js";

const router = Router();

router.get("/stats", authenticate, allowRoles("admin", "assistant"), getDashboardStats);

export default router;

