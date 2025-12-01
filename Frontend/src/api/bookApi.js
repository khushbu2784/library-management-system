import axios from "./axiosInstance";

export const bookApi = {
  getAllBooks: (filters = {}) => axios.get("/book", { params: filters }),
  getBookById: (id) => axios.get(`/book/${id}`),
};