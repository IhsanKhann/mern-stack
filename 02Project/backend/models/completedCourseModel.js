// models/CompletedCourse.js
import mongoose from "mongoose";

const completedCourseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.model("CompletedCourse", completedCourseSchema);
