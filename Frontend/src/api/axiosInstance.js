import axios from "axios";
import { encryptData, decryptData } from "../utils/crypto";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ===== REQUEST INTERCEPTOR =====
// axiosInstance.interceptors.request.use(
//   (config) => {

//     // 1️⃣ If request is complete-profile → use tempToken
//     if (config.url.includes("complete-profile")) {
//       const temp = localStorage.getItem("tempToken");
//       if (temp) config.headers.Authorization = `Bearer ${temp}`;
//     } 
//     // 2️⃣ Otherwise → use normal login token
//     else {
//       const token = localStorage.getItem("token");
//       if (token) config.headers.Authorization = `Bearer ${token}`;
//     }

//     // 3️⃣ Encrypt request body ONLY if user passed raw data
//     if (config.data && typeof config.data === "object" && !config.data.__encrypted) {
//       config.data = { data: encryptData(config.data), __encrypted: true };
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.request.use(
  (config) => {

    // 🔐 Token handling (unchanged)
    if (config.url.includes("complete-profile")) {
      const temp = localStorage.getItem("tempToken");
      if (temp) config.headers.Authorization = `Bearer ${temp}`;
    } else {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    // 🚫 DO NOT encrypt FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]; // let browser set it
      return config;
    }

    // 🔐 Encrypt only normal JSON
    if (config.data && typeof config.data === "object" && !config.data.__encrypted) {
      config.data = { data: encryptData(config.data), __encrypted: true };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===== RESPONSE INTERCEPTOR =====
axiosInstance.interceptors.response.use(
  (response) => {
    try {
      return decryptData(response.data) || response.data;
    } catch {
      return response.data;
    }
  },
  (error) => {
    const msg = error?.response?.data?.message || "Something went wrong!";
    return Promise.reject(new Error(msg));
  }
);



export default axiosInstance;
