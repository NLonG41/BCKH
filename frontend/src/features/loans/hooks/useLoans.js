import { useState, useEffect, useCallback } from "react";
import { loanRepository } from "../api";

/**
 * Custom hook for current loans business logic
 */
export const useLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLoans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loanRepository.getCurrent();
      setLoans(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load loans");
    } finally {
      setLoading(false);
    }
  }, []);

  const borrowBook = useCallback(async (bookId) => {
    setError(null);
    try {
      await loanRepository.borrow(bookId);
      await loadLoans();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to borrow book");
      throw err;
    }
  }, [loadLoans]);

  useEffect(() => {
    loadLoans();
  }, [loadLoans]);

  return {
    loans,
    loading,
    error,
    loadLoans,
    borrowBook,
  };
};

