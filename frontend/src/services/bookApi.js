import axiosClient from "./http.js";

export const bookApi = {
  async list() {
    const { data } = await axiosClient.get("/books");
    return data;
  },
  async top(limit = 5) {
    const { data } = await axiosClient.get("/books/top", { params: { limit } });
    return data;
  },
  async create(payload) {
    const { data } = await axiosClient.post("/books", payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await axiosClient.put(`/books/${id}`, payload);
    return data;
  },
  async remove(id) {
    const { data } = await axiosClient.delete(`/books/${id}`);
    return data;
  }
};

