// ✅ frontend/src/api/api.js
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://junior-technical-school-ezx9.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
