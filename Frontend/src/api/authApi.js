import axios from "./axiosInstance";

export const authApi = {
  signup: (data) => axios.post("/auth/signup", data),
  login: (data) => axios.post("/auth/login", data),
  logout: () => axios.post("/auth/logout"),
};
