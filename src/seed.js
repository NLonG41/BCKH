import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Book from "./models/Book.js";
import Loan from "./models/Loan.js";
import Notification from "./models/Notification.js";

// Các tài khoản hệ thống mặc định (KHÔNG tạo sinh viên demo để không ghi đè dữ liệu thật)
const defaultUsers = [
  {
    username: "admin",
    fullName: "Quản Trị Viên",
    email: "admin@library.dev",
    password: "admin",
    role: "admin"
  },
  {
    username: "assistant",
    fullName: "Trợ Lý Thư Viện",
    email: "assistant@library.dev",
    password: "123456",
    role: "assistant"
  }
];

const defaultBooks = [
  {
    title: "Lập trình JavaScript",
    author: "Nguyễn Văn A",
    category: "CNTT",
    quantity: 5,
    description: "Cuốn sách cung cấp kiến thức từ cơ bản đến nâng cao về ngôn ngữ lập trình JavaScript. Bao gồm các khái niệm về biến, hàm, đối tượng, DOM manipulation, và các framework hiện đại như React, Vue.",
    coverUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=600&fit=crop"
  },
  {
    title: "Cấu trúc dữ liệu & giải thuật",
    author: "Nguyễn Văn B",
    category: "CNTT",
    quantity: 3,
    description: "Tài liệu học tập về các cấu trúc dữ liệu cơ bản và nâng cao như mảng, danh sách liên kết, cây, đồ thị. Kèm theo các thuật toán sắp xếp, tìm kiếm và phân tích độ phức tạp.",
    coverUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=600&fit=crop"
  },
  {
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    category: "Kỹ năng",
    quantity: 4,
    description: "Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử trong cuộc sống. Hướng dẫn cách xây dựng mối quan hệ tốt đẹp, thuyết phục người khác và trở thành người được yêu mến.",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
  },
  {
    title: "Tư duy nhanh và chậm",
    author: "Daniel Kahneman",
    category: "Kỹ năng",
    quantity: 4,
    description: "Nobel Prize winner Daniel Kahneman giải thích hai hệ thống tư duy của con người: hệ thống nhanh (trực giác) và hệ thống chậm (phân tích). Cuốn sách giúp hiểu rõ hơn về cách bộ não hoạt động và ra quyết định.",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop"
  }
];

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const seed = async () => {
  await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/library");
  console.log("Running seed script...");

  const userMap = {};
  for (const entry of defaultUsers) {
    const passwordHash = await bcrypt.hash(entry.password, 10);
    const user = await User.findOneAndUpdate(
      { username: entry.username },
      { ...entry, passwordHash },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`Ensured user ${entry.username} / ${entry.password}`);
    userMap[entry.username] = user;
  }

  // Đảm bảo danh sách sách mẫu (KHÔNG tạo loans demo, để dữ liệu mượn thực tế do người dùng tạo)
  for (const book of defaultBooks) {
    let doc = await Book.findOne({ title: book.title });
    if (!doc) {
      doc = await Book.create(book);
      console.log(`Added book ${book.title}`);
    }
  }

  console.log("Seed completed (only system accounts + default books, không tạo user sinh viên demo).");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed error:", error);
  process.exit(1);
});

