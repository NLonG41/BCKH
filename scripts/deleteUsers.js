import "dotenv/config";
import { connectDB } from "../src/config/db.js";
import User from "../src/models/User.js";
import Loan from "../src/models/Loan.js";
import Notification from "../src/models/Notification.js";

const deleteUsers = async () => {
  await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/library");
  console.log("MongoDB connected");

  // Tìm các user cần xóa
  const usersToDelete = await User.find({
    $or: [
      { username: "sinhvien_a", fullName: "Trần Minh An" },
      { username: "sinhvien_b", fullName: "Lê Lan" }
    ]
  });

  if (usersToDelete.length === 0) {
    console.log("Không tìm thấy user cần xóa.");
    process.exit(0);
  }

  console.log(`Tìm thấy ${usersToDelete.length} user cần xóa:`);
  usersToDelete.forEach((user) => {
    console.log(`   - ${user.fullName} (${user.username})`);
  });

  // Xóa tất cả loans và notifications liên quan
  for (const user of usersToDelete) {
    const loanCount = await Loan.countDocuments({ user: user._id });
    const notificationCount = await Notification.countDocuments({ user: user._id });
    
    if (loanCount > 0) {
      await Loan.deleteMany({ user: user._id });
      console.log(`   Đã xóa ${loanCount} phiếu mượn của ${user.fullName}`);
    }
    
    if (notificationCount > 0) {
      await Notification.deleteMany({ user: user._id });
      console.log(`   Đã xóa ${notificationCount} thông báo của ${user.fullName}`);
    }
  }

  // Xóa các user
  const result = await User.deleteMany({
    $or: [
      { username: "sinhvien_a", fullName: "Trần Minh An" },
      { username: "sinhvien_b", fullName: "Lê Lan" }
    ]
  });

  console.log(`\nĐã xóa vĩnh viễn ${result.deletedCount} user khỏi database.`);
  process.exit(0);
};

deleteUsers().catch((error) => {
  console.error("Lỗi khi xóa user:", error);
  process.exit(1);
});

