import axiosClient from "./http.js";

export const recommendationApi = {
  async list() {
    const { data } = await axiosClient.get("/recommendations");
    return data;
  }
};

