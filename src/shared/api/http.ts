import axios from "axios";

export const http = axios.create({ baseURL: "", timeout: 15000 });

http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err?.response?.data || err?.message);
    return Promise.reject(err);
  }
);
