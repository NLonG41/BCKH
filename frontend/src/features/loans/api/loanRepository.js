import axiosClient from "../../../services/http.js";

/**
 * Loan Repository - Data Access Layer
 * Implements Repository Pattern for loan-related API calls
 */
class LoanRepository {
  async getCurrent() {
    const { data } = await axiosClient.get("/loans");
    return data;
  }

  async getHistory() {
    const { data } = await axiosClient.get("/loans/history");
    return data;
  }

  async getAllForManagement() {
    const { data } = await axiosClient.get("/loans/manage");
    return data;
  }

  async borrow(bookId) {
    const { data } = await axiosClient.post("/loans", { bookId });
    return data;
  }

  async confirmReturn(id) {
    const { data } = await axiosClient.post(`/loans/${id}/confirm`);
    return data;
  }

  async runOverdueScan() {
    const { data } = await axiosClient.post("/loans/overdue/scan");
    return data;
  }
}

export const loanRepository = new LoanRepository();

