// ✅ frontend/src/api/api.js
import axios from "axios";
import { getToken } from "@clerk/clerk-react";

// CRA supports only REACT_APP_* env vars
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://junior-technical-school-ezx9.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ Automatically attach Clerk session token for protected routes
api.interceptors.request.use(async (config) => {
  try {
    const token = await getToken({ template: "default" }); // Get Clerk session token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn("No Clerk token found:", err);
  }
  return config;
});

export default api;
