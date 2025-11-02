import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Import Routes
import eventRoutes from "./routes/eventRoutes.js";
import galleryRoutes from "./routes/gallery.js";
import admissionRoutes from "./routes/admissions.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Enable JSON parsing
app.use(express.json());

// ✅ CORS setup (you can restrict origin later)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ✅ Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve uploaded static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API routes
app.use("/api/admission", admissionRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Serve React frontend (for production)
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

// ✅ Fallback: serve index.html for any non-API routes
app.use((req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
