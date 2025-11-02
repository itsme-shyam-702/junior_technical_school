// import axios from "axios";

// const API_URL = "/api/gallery"; // adjust if your server uses another port

// const api = {
//   getAll: () => axios.get(API_URL),
//   getDeleted: () => axios.get(`${API_URL}/deleted`),
//   add: (formData) =>
//     axios.post(API_URL, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     }),
//   softDelete: (id) => axios.patch(`${API_URL}/delete/${id}`),
//   restore: (id) => axios.patch(`${API_URL}/restore/${id}`),
//   permanentDelete: (id) => axios.delete(`${API_URL}/${id}`),
// };

// export default api;


// frontend/src/api/gallery.js
import api from "./api"; // <-- your configured Axios instance (with baseURL and interceptors)

// 📌 All requests go through your backend’s protected Clerk middleware.
//    Clerk token is automatically attached by api.js if you added that setup.

const galleryAPI = {
  // ✅ Get all active images
  getAll: () => api.get("/gallery"),

  // ✅ Get soft-deleted images
  getDeleted: () => api.get("/gallery/deleted"),

  // ✅ Add new image
  add: (formData) =>
    api.post("/gallery", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // ✅ Soft delete (move to Recently Deleted)
  softDelete: (id) => api.delete(`/gallery/${id}`),

  // ✅ Restore deleted image
  restore: (id) => api.put(`/gallery/restore/${id}`),

  // ✅ Permanently delete image
  permanentDelete: (id) => api.delete(`/gallery/permanent/${id}`),
};

export default galleryAPI;
