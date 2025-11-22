import Book from "../models/Book.js";
import Loan from "../models/Loan.js";
import User from "../models/User.js";

export const getDashboardStats = async (_req, res) => {
  const [totalTitles, copiesAgg, activeLoans, overdueLoans, studentCount] = await Promise.all([
    Book.countDocuments(),
    Book.aggregate([{ $group: { _id: null, total: { $sum: "$quantity" } } }]),
    Loan.countDocuments({ status: "borrowed" }),
    Loan.countDocuments({ status: "overdue" }),
    User.countDocuments({ role: "user" })
  ]);

  res.json({
    totalTitles,
    totalCopies: copiesAgg[0]?.total || 0,
    activeLoans,
    overdueLoans,
    studentCount
  });
};

