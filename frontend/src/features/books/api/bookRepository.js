import axiosClient from "../../../services/http.js";

/**
 * Book Repository - Data Access Layer
 * Implements Repository Pattern for book-related API calls
 */
class BookRepository {
  async getAll() {
    const { data } = await axiosClient.get("/books");
    return data;
  }

  async getTop(limit = 5) {
    const { data } = await axiosClient.get("/books/top", { params: { limit } });
    return data;
  }

  async create(payload) {
    const { data } = await axiosClient.post("/books", payload);
    return data;
  }

  async update(id, payload) {
    const { data } = await axiosClient.put(`/books/${id}`, payload);
    return data;
  }

  async delete(id) {
    const { data } = await axiosClient.delete(`/books/${id}`);
    return data;
  }
}

export const bookRepository = new BookRepository();

