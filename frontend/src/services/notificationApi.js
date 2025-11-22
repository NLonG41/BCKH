import axiosClient from "./http.js";

export const notificationApi = {
  async list() {
    const { data } = await axiosClient.get("/notifications");
    return data;
  },
  async markRead(id) {
    const { data } = await axiosClient.post(`/notifications/${id}/read`);
    return data;
  },
  async create(payload) {
    const { data } = await axiosClient.post("/notifications", payload);
    return data;
  }
};

