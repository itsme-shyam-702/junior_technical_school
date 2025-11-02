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

// ✅ Allow JSON
app.use(express.json());

// ✅ CORS — allow all or specify domains
app.use(
  cors({
    origin: "*", // You can later restrict to your frontend domain
    credentials: true,
  })
);

// ✅ Serve uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API routes
app.use("/api/admission", admissionRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Serve React frontend (for production)
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

// Serve index.html for all non-API routes
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
