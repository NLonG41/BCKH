import Loan from "../models/Loan.js";
import Book from "../models/Book.js";

export const getRecommendations = async (req, res) => {
  const loans = await Loan.find({ user: req.user.id }).populate("book", "category");
  const categories = [...new Set(loans.map((loan) => loan.book?.category).filter(Boolean))];

  if (!categories.length) {
    return res.json([]);
  }

  const excludeIds = loans.map((loan) => loan.book?._id).filter(Boolean);
  const books = await Book.find({
    category: { $in: categories },
    _id: { $nin: excludeIds }
  }).limit(6);

  res.json(books);
};

