import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router.js";
import config from "./config.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.get("/", (req, res) => {
  res.send("Learnify backend is working!");
});

app.use("/api", router); // All routes will be under /api

// Start server
const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Access backend Server here: http://localhost:${PORT}`);
});
