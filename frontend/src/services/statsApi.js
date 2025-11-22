import axiosClient from "./http.js";

export const statsApi = {
  async get() {
    const { data } = await axiosClient.get("/admin/stats");
    return data;
  }
};

