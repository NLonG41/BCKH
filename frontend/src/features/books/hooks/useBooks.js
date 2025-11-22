import { useState, useEffect, useCallback } from "react";
import { bookRepository } from "../api";

/**
 * Custom hook for books business logic
 * Handles state management and operations for books
 */
export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookRepository.getAll();
      setBooks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  }, []);

  const createBook = useCallback(async (payload) => {
    setError(null);
    try {
      const newBook = await bookRepository.create(payload);
      setBooks((prev) => [...prev, newBook]);
      return newBook;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create book");
      throw err;
    }
  }, []);

  const updateBook = useCallback(async (id, payload) => {
    setError(null);
    try {
      const updatedBook = await bookRepository.update(id, payload);
      setBooks((prev) => prev.map((book) => (book._id === id ? updatedBook : book)));
      return updatedBook;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update book");
      throw err;
    }
  }, []);

  const deleteBook = useCallback(async (id) => {
    setError(null);
    try {
      await bookRepository.delete(id);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete book");
      throw err;
    }
  }, []);

  // Auto-load books on mount
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  return {
    books,
    loading,
    error,
    loadBooks,
    createBook,
    updateBook,
    deleteBook,
  };
};

