import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";
import { markOverduesAndNotify } from "./controllers/loanController.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (_, res) => res.json({ message: "Library API ready" }));
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/translate", translateRoutes);

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/library");
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  // quick interval check (every hour) to mark overdue loans
  setInterval(markOverduesAndNotify, 60 * 60 * 1000);
};

start();

