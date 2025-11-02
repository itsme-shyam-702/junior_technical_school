// ✅ frontend/src/api/api.js
import axios from "axios";
import { clerkClient } from "@clerk/clerk-js"; // ✅ Import correct client lib for token handling

// CRA supports only REACT_APP_* env vars
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://junior-technical-school-ezx9.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ Try to attach Clerk token automatically (safe fallback for v5+)
api.interceptors.request.use(async (config) => {
  try {
    const session = await window.Clerk?.session?.getToken();
    if (session) {
      config.headers.Authorization = `Bearer ${session}`;
    }
  } catch (err) {
    console.warn("No Clerk session token found:", err);
  }
  return config;
});

export default api;
