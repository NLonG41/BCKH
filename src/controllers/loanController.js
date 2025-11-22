import dayjs from "dayjs";
import Book from "../models/Book.js";
import Loan from "../models/Loan.js";
import Notification from "../models/Notification.js";
import { calculateDueDate, isOverdue } from "../utils/date.js";

const DEFAULT_LOAN_DAYS = Number(process.env.LOAN_DAYS) || 14;

export const getActiveLoans = async (req, res) => {
  const loans = await Loan.find({ user: req.user.id, status: { $ne: "returned" } })
    .populate("book")
    .sort({ borrowDate: -1 });
  res.json(loans);
};

export const getLoanHistory = async (req, res) => {
  const loans = await Loan.find({ user: req.user.id })
    .populate("book")
    .sort({ borrowDate: -1 });
  res.json(loans);
};

export const getManageLoans = async (req, res) => {
  const loans = await Loan.find({ status: { $ne: "returned" } })
    .populate("book")
    .populate("user", "username fullName email")
    .sort({ dueDate: 1 });
  res.json(loans);
};

export const borrowBook = async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);
  if (!book || book.quantity <= 0) {
    return res.status(400).json({ message: "Sách tạm hết" });
  }

  const dueDate = calculateDueDate(new Date(), DEFAULT_LOAN_DAYS);
  const loan = await Loan.create({
    user: req.user.id,
    book: book._id,
    dueDate
  });

  book.quantity -= 1;
  book.borrowedCount += 1;
  await book.save();

  res.status(201).json({ loan, message: "Mượn sách thành công" });
};

export const confirmReturn = async (req, res) => {
  const loan = await Loan.findById(req.params.id).populate("book user");
  if (!loan || loan.status === "returned") {
    return res.status(400).json({ message: "Không tìm thấy phiếu mượn hợp lệ" });
  }

  const overdue = loan.status === "overdue" || isOverdue(loan.dueDate);
  loan.returnDate = new Date();
  loan.status = "returned";
  await loan.save();

  loan.book.quantity += 1;
  await loan.book.save();

  if (overdue) {
    await Notification.create({
      user: loan.user._id,
      message: `Sách "${loan.book.title}" đã được trả muộn. Vui lòng chú ý lần sau.`
    });
  }

  res.json({ message: "Đã xác nhận trả sách", overdue });
};

export const markOverduesAndNotify = async () => {
  const now = dayjs().toDate();
  const overdueLoans = await Loan.find({
    status: "borrowed",
    dueDate: { $lt: now }
  }).populate("book");

  for (const loan of overdueLoans) {
    loan.status = "overdue";
    await loan.save();
    await Notification.create({
      user: loan.user,
      message: `Sách "${loan.book.title}" đã quá hạn. Vui lòng trả sớm.`
    });
  }
};

export const manualOverdueScan = async (_req, res) => {
  await markOverduesAndNotify();
  res.json({ message: "Đã quét và gửi thông báo quá hạn" });
};

