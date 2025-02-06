import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Import this to use __dirname in ES module
import teacherRoute from "./routes/teacher.js";
import studentRoute from "./routes/student.js";
import homeRoute from "./routes/homeRoute.js";

// Load environment variables
dotenv.config();

const app = express();

// = __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//the views path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(cors());

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Routes handling
app.use("/", homeRoute);
app.use("/student", studentRoute);
app.use("/teacher", teacherRoute);

// ✅ MongoDB connection with options to prevent warnings
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
