// here I will have the schema and model of enrollements
import mongoose from "mongoose";

const enrollementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        required: true,
    },
    enrolledAt:{
        type: Date,
        default: Date.now()
    },
    completedAt:{
        type: Date,
        default: null
        // not required but we set the default for this later
    },
    status:{
        type: String,
        enum: ["enrolled", "completed"],
        default: "enrolled"
    },

    // title: {
    //     type: String,
    //     required: true,
    //     unique: true, // Ensures no two documents can have the same title
    //     trim: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // },
    // price: {
    //     type: Number,
    //     required: true
    // },
    // category: {
    //     type: String,
    //     required: true
    // },
    // image: {
    //     type: String,
    //     required: true
    // },
    // status: {
    //     type: String,
    //     required: true
    // }
    // user id for later. 
}) 

const enrollementModel = new mongoose.model("enrollements",enrollementSchema);
export default enrollementModel;

