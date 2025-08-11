import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router.js";
import config from "./config.js";
import CourseRouter from "./routes/CourseRoutes.js";
import UserRouter from "./routes/UserRoutes.js";

const app = express();

// allow the client url to access the backend.
app.use(cors({
  origin: config.clientURL,
  credentials: true,
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.get("/", (req, res) => {
  res.send("Learnify backend is working!");
});

app.use("/api", CourseRouter); // All routes for courses
app.use("/user", UserRouter); // All routes for users

// Start server
const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Access backend Server here: http://localhost:${PORT}`);
});
