import axiosClient from "../../../services/http.js";

/**
 * Stats Repository - Data Access Layer
 * Implements Repository Pattern for statistics-related API calls
 */
class StatsRepository {
  async get() {
    const { data } = await axiosClient.get("/admin/stats");
    return data;
  }
}

export const statsRepository = new StatsRepository();

