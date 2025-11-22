import { useState, useEffect, useCallback } from "react";
import { userRepository } from "../api";

/**
 * Custom hook for users business logic
 */
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userRepository.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleUserActive = useCallback(async (id) => {
    setError(null);
    try {
      const updatedUser = await userRepository.toggleActive(id);
      setUsers((prev) => prev.map((user) => (user._id === id ? updatedUser : user)));
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to toggle user status");
      throw err;
    }
  }, []);

  const resetUserPassword = useCallback(async (id, newPassword) => {
    setError(null);
    try {
      await userRepository.resetPassword(id, newPassword);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
      throw err;
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    setError(null);
    try {
      await userRepository.delete(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
      throw err;
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    loadUsers,
    toggleUserActive,
    resetUserPassword,
    deleteUser,
  };
};

