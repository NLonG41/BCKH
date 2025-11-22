import axiosClient from "../../../services/http.js";

/**
 * Notification Repository - Data Access Layer
 * Implements Repository Pattern for notification-related API calls
 */
class NotificationRepository {
  async getAll() {
    const { data } = await axiosClient.get("/notifications");
    return data;
  }

  async markAsRead(id) {
    const { data } = await axiosClient.post(`/notifications/${id}/read`);
    return data;
  }

  async create(payload) {
    const { data } = await axiosClient.post("/notifications", payload);
    return data;
  }
}

export const notificationRepository = new NotificationRepository();

