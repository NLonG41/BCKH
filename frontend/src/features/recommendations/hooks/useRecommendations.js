import { useState, useEffect } from "react";
import { recommendationRepository } from "../api";

/**
 * Custom hook for recommendations business logic
 */
export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await recommendationRepository.getAll();
        setRecommendations(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  return { recommendations, loading, error };
};

