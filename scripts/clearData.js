import "dotenv/config";
import { connectDB } from "../src/config/db.js";
import Loan from "../src/models/Loan.js";
import Notification from "../src/models/Notification.js";
import Book from "../src/models/Book.js";

/**
 * Script dọn dẹp toàn bộ dữ liệu mượn trả DEMO.
 *
 * - Cộng trả lại số lượng sách đang được mượn (status != returned)
 * - Xóa toàn bộ Loan
 * - Xóa toàn bộ Notification
 *
 * Chạy: npm run clear:data
 */
const clearData = async () => {
  await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/library");

  // Lấy tất cả phiếu mượn chưa trả để cộng lại quantity cho sách
  const activeLoans = await Loan.find({ status: { $ne: "returned" } }).populate("book");

  for (const loan of activeLoans) {
    if (loan.book) {
      loan.book.quantity += 1;
      await loan.book.save();
    }
  }

  // Xóa toàn bộ lịch sử mượn & thông báo
  await Loan.deleteMany({});
  await Notification.deleteMany({});

  console.log("✅ Đã xóa toàn bộ lịch sử mượn và thông báo, đồng thời cập nhật lại số lượng sách.");
  process.exit(0);
};

clearData().catch((err) => {
  console.error("❌ Lỗi khi clear data:", err);
  process.exit(1);
});

