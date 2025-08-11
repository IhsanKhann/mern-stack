import mongoose from "mongoose";

const completedCourseSchema = new mongoose.Schema({
  courseId: String,
   title: {
    type: String,
    required: true,
    unique: true, // Ensures no two documents can have the same title
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: String
},{ collection: 'completedCourses' });

const completedCourseModel = mongoose.model("completedCourses", completedCourseSchema);
export default completedCourseModel;
