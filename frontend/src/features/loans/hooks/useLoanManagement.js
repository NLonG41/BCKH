import { useState, useEffect, useCallback } from "react";
import { loanRepository } from "../api";

/**
 * Custom hook for loan management business logic (librarian)
 */
export const useLoanManagement = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const loadLoans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loanRepository.getAllForManagement();
      setLoans(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load loans");
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmReturn = useCallback(async (loanId) => {
    setError(null);
    setMessage("");
    try {
      await loanRepository.confirmReturn(loanId);
      setMessage("Return confirmed successfully");
      await loadLoans();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to confirm return");
      throw err;
    }
  }, [loadLoans]);

  const runOverdueScan = useCallback(async () => {
    setError(null);
    setMessage("");
    try {
      const response = await loanRepository.runOverdueScan();
      setMessage(response.message);
      await loadLoans();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to run overdue scan");
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
    message,
    loadLoans,
    confirmReturn,
    runOverdueScan,
  };
};

