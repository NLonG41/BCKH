import { Router } from "express";
import { authenticate, allowRoles } from "../middleware/auth.js";
import {
  listNotifications,
  markAsRead,
  createNotification
} from "../controllers/notificationController.js";

const router = Router();

router.get("/", authenticate, listNotifications);
router.post("/:id/read", authenticate, markAsRead);
router.post("/", authenticate, allowRoles("admin", "assistant"), createNotification);

export default router;

