import axiosClient from "./http.js";

export const userApi = {
  async list() {
    const { data } = await axiosClient.get("/users");
    return data;
  },
  async toggleActive(id) {
    const { data } = await axiosClient.post(`/users/${id}/toggle-active`);
    return data;
  },
  async resetPassword(id, newPassword) {
    const { data } = await axiosClient.post(`/users/${id}/reset-password`, { newPassword });
    return data;
  },
  async delete(id) {
    const { data } = await axiosClient.delete(`/users/${id}`);
    return data;
  }
};

