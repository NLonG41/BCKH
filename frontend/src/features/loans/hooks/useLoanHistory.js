import { useState, useEffect } from "react";
import { loanRepository } from "../api";

/**
 * Custom hook for loan history business logic
 */
export const useLoanHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loanRepository.getHistory();
        setHistory(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load loan history");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return { history, loading, error };
};

