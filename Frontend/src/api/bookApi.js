import axios from "./axiosInstance";

export const bookApi = {
  getAllBooks: (filters = {}) => axios.get("/book", { params: filters }),
  getBookById: (id) => axios.get(`/book/${id}`),

  addBook: (data) => axios.post("/book/admin/add", data),
  updateBook: (id, data) =>
    axios.put(`/book/admin/update/${id}`, data),
  deleteBook: (id) =>
    axios.delete(`/book/admin/delete/${id}`),
};