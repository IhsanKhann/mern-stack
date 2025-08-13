// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Vite dev server proxy must route /api -> backend or use full backend URL
  // optionally set timeout, headers etc.
});

// helper to set Authorization header at runtime
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
