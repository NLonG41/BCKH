import { Router } from "express";
import { authenticate, allowRoles } from "../middleware/auth.js";
import {
  borrowBook,
  getActiveLoans,
  getLoanHistory,
  getManageLoans,
  confirmReturn,
  manualOverdueScan
} from "../controllers/loanController.js";

const router = Router();

router.get("/", authenticate, getActiveLoans);
router.get("/history", authenticate, getLoanHistory);
router.get("/manage", authenticate, allowRoles("admin", "assistant"), getManageLoans);
router.post("/", authenticate, allowRoles("user"), borrowBook);
router.post("/:id/confirm", authenticate, allowRoles("admin", "assistant"), confirmReturn);
router.post("/overdue/scan", authenticate, allowRoles("admin", "assistant"), manualOverdueScan);

export default router;

