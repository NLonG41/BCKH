import { useState, useEffect } from "react";
import { statsRepository } from "../api";

/**
 * Custom hook for statistics business logic
 */
export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await statsRepository.get();
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading, error };
};

