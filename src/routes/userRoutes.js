import { Router } from "express";
import { authenticate, allowRoles } from "../middleware/auth.js";
import {
  listUsers,
  resetPassword,
  toggleActive,
  deleteUser
} from "../controllers/userController.js";

const router = Router();

router.get("/", authenticate, allowRoles("admin", "assistant"), listUsers);
router.post("/:id/reset-password", authenticate, allowRoles("admin", "assistant"), resetPassword);
router.post("/:id/toggle-active", authenticate, allowRoles("admin", "assistant"), toggleActive);
router.delete("/:id", authenticate, allowRoles("admin", "assistant"), deleteUser);

export default router;

