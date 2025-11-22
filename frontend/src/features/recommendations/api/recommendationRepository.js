import axiosClient from "../../../services/http.js";

/**
 * Recommendation Repository - Data Access Layer
 * Implements Repository Pattern for recommendation-related API calls
 */
class RecommendationRepository {
  async getAll() {
    const { data } = await axiosClient.get("/recommendations");
    return data;
  }
}

export const recommendationRepository = new RecommendationRepository();

