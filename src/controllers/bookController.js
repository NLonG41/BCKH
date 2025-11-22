import Book from "../models/Book.js";

export const listBooks = async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
};

export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json({ message: "Deleted" });
};

export const getTopBorrowed = async (req, res) => {
  const limit = Number(req.query.limit) || 5;
  const books = await Book.find().sort({ borrowedCount: -1 }).limit(limit);
  res.json(books);
};

