import express from "express";
import { translateText, translateBatch } from "../controllers/translateController.js";

const router = express.Router();

// Dịch một text
router.post("/text", translateText);

// Dịch nhiều text cùng lúc (batch)
router.post("/batch", translateBatch);

export default router;

