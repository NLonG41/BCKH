import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = Router();

router.get("/", authenticate, getRecommendations);

export default router;

