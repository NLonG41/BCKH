import axiosClient from "./http.js";

export const loanApi = {
  async current() {
    const { data } = await axiosClient.get("/loans");
    return data;
  },
  async history() {
    const { data } = await axiosClient.get("/loans/history");
    return data;
  },
  async manageAll() {
    const { data } = await axiosClient.get("/loans/manage");
    return data;
  },
  async borrow(bookId) {
    const { data } = await axiosClient.post("/loans", { bookId });
    return data;
  },
  async confirmReturn(id) {
    const { data } = await axiosClient.post(`/loans/${id}/confirm`);
    return data;
  },
  async runOverdueScan() {
    const { data } = await axiosClient.post("/loans/overdue/scan");
    return data;
  }
};

