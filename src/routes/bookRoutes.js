import { Router } from "express";
import {
  listBooks,
  createBook,
  updateBook,
  deleteBook,
  getTopBorrowed
} from "../controllers/bookController.js";
import { authenticate, allowRoles } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticate, listBooks);
router.get("/top", authenticate, getTopBorrowed);
router.post("/", authenticate, allowRoles("admin", "assistant"), createBook);
router.put("/:id", authenticate, allowRoles("admin", "assistant"), updateBook);
router.delete("/:id", authenticate, allowRoles("admin", "assistant"), deleteBook);

export default router;

