// models/courseModel.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true, // Ensures no two documents can have the same title
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
     lowercase: true
  },
  image: {
    type: String,
    required: true,
     lowercase: true
  },
  category: {
    type: String,
    required: true,
     lowercase: true
  },
  duration: {
    type: String,
    required: true,
    lowercase: true
  },
  status:{
    type: String,
    enum: ["available", "enrolled already"],
    default: "available"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
},{ collection: 'courses' });

const courseModel = mongoose.model("courses", courseSchema);

export default courseModel;
