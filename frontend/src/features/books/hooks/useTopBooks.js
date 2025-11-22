import { useState, useEffect } from "react";
import { bookRepository } from "../api";

/**
 * Custom hook for top books business logic
 */
export const useTopBooks = (limit = 5) => {
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTopBooks = async () => {
      setLoading(true);
      try {
        const data = await bookRepository.getTop(limit);
        setTopBooks(data);
      } catch (err) {
        console.error("Failed to load top books:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTopBooks();
  }, [limit]);

  return { topBooks, loading };
};

