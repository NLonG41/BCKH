import axiosClient from "../../../services/http.js";

/**
 * User Repository - Data Access Layer
 * Implements Repository Pattern for user-related API calls
 */
class UserRepository {
  async getAll() {
    const { data } = await axiosClient.get("/users");
    return data;
  }

  async toggleActive(id) {
    const { data } = await axiosClient.post(`/users/${id}/toggle-active`);
    return data;
  }

  async resetPassword(id, newPassword) {
    const { data } = await axiosClient.post(`/users/${id}/reset-password`, { newPassword });
    return data;
  }

  async delete(id) {
    const { data } = await axiosClient.delete(`/users/${id}`);
    return data;
  }
}

export const userRepository = new UserRepository();

