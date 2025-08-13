// controllers/allCourseControllers.js
import e from "express";
import completedCourseModel from "../models/completedCourseModel.js";
import courseModel from "../models/courseModel.js"; // <- make sure `.js` is added (if using ESM)
import enrollementModel from "../models/enrollementModel.js";
// import completedCourseModel from "../models/completedCourseModel.js";

// controllers/allCourseControllers.js
const getAllCourses = async (req, res) => {
  try {
    const allCourses = await courseModel.find();

    // For testing, return all courses as-is without modifying status
    res.status(200).json({
      success: true,
      message: "All courses fetched successfully.",
      allCourses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching all courses.",
      error: error.message
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id);

    if (course) {
      res.status(200).json({
        success: true,
        message: "Course fetched successfully.",
        course
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No course found with this ID."
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching course by ID.",
      error: error.message
    });
  }
};

// make a course:
const createCourse = async (req, res) => {
  try {
    const { title, description, price, image, category, duration } = req.body;
    
    // else part:
    const exists = await courseModel.findOne({title});
    if(exists){
      return res.status(400).json({
        success: false,
        message: "Course with this title already exists.",
        exists
      })
    }
  
    const newCourse = new courseModel({
      title,
      description,
      price,
      image,
      category,
      duration,
    });
    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully.",
      newCourse
    });
  } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error while creating course.",
        error: error.message
      })
    }
  };

// get Enrollements: for a specific user.
// getAllEnrolledCourses (user-specific)
const getAllEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, message: "userId required in params" });

    const enrolledCourses = await enrollementModel.find({ user: userId }).populate("course");

    res.status(200).json({
      success: true,
      message: "Enrolled courses fetched successfully.",
      enrolledCourses
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error while fetching enrolled courses.", error: error.message });
  }
  // console.log(enrolledCourses);
};

// get a single Enrollement:
const getSingleEnrollement = async (req,res) => {
    try{
      const { id } = req.params; // correct destructuring from req.params object
        // this is the enrollement id, the user id no longer needed.
        
        const enrollement = await enrollementModel.findById(id).populate("course");
        if(enrollement){
            res.status(200).json({
                success: true,
                message: "Enrollement fetched successfully.",
                enrollement
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: "No enrollement found with this ID."
            })
        }
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: "Error while fetching enrollement by ID.",
            error: error.message
        })
    }
}

// createEnrollement
const createEnrollement = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "courseId and userId required"
      });
    }

    // Check if enrollment already exists for this user & course
    const existing = await enrollementModel.findOne({ course: courseId, user: userId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Enrollment already exists.",
        existingEnrollement: existing
      });
    }

    // Create new enrollment
    const newEnrollement = new enrollementModel({
      user: userId,
      course: courseId,
      enrolledAt: new Date(),
    });

    await newEnrollement.save();

    // Update course status
    await courseModel.findByIdAndUpdate(courseId, { status: "enrolled already" });

    return res.status(201).json({
      success: true,
      message: "Enrollment created successfully.",
      newEnrollement
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating enrollment.",
      error: error.message
    });
  }
};


// one function to handle both course and enrollement status changes.
const changeStatus = async (req, res) => {
  try {
    const { id } = req.params; // ID of course or enrollement
    const { status, type } = req.body; // type: "course" or "enrollement"

    // Allowed enum values from your schema
    const validStatuses = ["enrolled already", "available", "enrolled", "completed"];
    
    // Check if status is valid
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid status provided."
      });
    }

    let updatedDoc;

    // Decide which model to update based on type
    if (type === "course") {
        updatedDoc = await courseModel.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
      } else if (type === "enrollement") {
        updatedDoc = await enrollementModel.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
      }
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be 'course' or 'enrollement'."
      });
    }

    if (!updatedDoc) {
      return res.status(404).json({
        success: false,
        message: `${type} not found. Status not updated.`
      });
    }

    res.status(200).json({
      success: true,
      message: `${type} status updated successfully.`,
      updated: updatedDoc
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while updating status.",
      error: error.message
    });
  }
};

// DELETE enrollment
const deleteEnrollement = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await enrollementModel.findByIdAndDelete(id);

    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Enrollment deleted successfully.",
        deleted
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Enrollment not found."
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while deleting enrollment.",
      error: error.message
    });
  }
};

const createCompletedCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) return res.status(400).json({ success: false, message: "userId and courseId required" });

    const exists = await completedCourseModel.findOne({ user: userId, course: courseId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Course already completed.", existingCompletedCourse: exists });
    }

    const newCompletedCourse = new completedCourseModel({ user: userId, course: courseId, completedAt: Date.now() });
    await newCompletedCourse.save();

    res.status(201).json({ success: true, message: "Completed course created successfully.", completedCourse: newCompletedCourse });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error while creating completed course.", error: error.message });
  }
};

// getCompletedCourses
const getCompletedCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, message: "userId required in params" });

    const completedCourses = await completedCourseModel.find({ user: userId }).populate("course", "title description price");

    res.status(200).json({ success: true, message: "Completed courses fetched successfully.", completedCourses });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error while fetching completed courses.", error: error.message });
  }
};

export { 
  getAllCourses, 
  getCourseById,
  createCourse, 
  createEnrollement,
  getAllEnrolledCourses,
  getSingleEnrollement,
  changeStatus,
  deleteEnrollement,
  createCompletedCourse,
  getCompletedCourses,
};