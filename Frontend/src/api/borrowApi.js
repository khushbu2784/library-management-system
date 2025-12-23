import axios from "./axiosInstance";

export const borrowApi = {
  borrowBook: (bookId) => axios.post("/borrow", { bookId }),
  returnBook: (bookId) => axios.post("/borrow/return", { bookId }),
  getUserHistory: () => axios.get("/borrow/history"),
  getAllHistory: () => axios.get("/borrow/admin/history"),
};
