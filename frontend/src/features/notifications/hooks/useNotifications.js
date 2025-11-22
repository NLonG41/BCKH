import { useState, useEffect, useCallback } from "react";
import { notificationRepository } from "../api";

/**
 * Custom hook for notifications business logic
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationRepository.getAll();
      setNotifications(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id) => {
    setError(null);
    try {
      await notificationRepository.markAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === id ? { ...notif, read: true } : notif))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark notification as read");
      throw err;
    }
  }, []);

  const createNotification = useCallback(async (payload) => {
    setError(null);
    try {
      const newNotification = await notificationRepository.create(payload);
      setNotifications((prev) => [newNotification, ...prev]);
      return newNotification;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create notification");
      throw err;
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return {
    notifications,
    loading,
    error,
    loadNotifications,
    markAsRead,
    createNotification,
  };
};

