// models/CompletedCourse.js
import mongoose from "mongoose";

const completedCourseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.model("CompletedCourse", completedCourseSchema);
