// models/courseModel.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
},{ collection: 'courses' });

const courseModel = mongoose.model("courses", courseSchema);

export default courseModel;
