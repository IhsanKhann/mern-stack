// controllers/allCourseControllers.js
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
        existingCourse
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

// get Enrollements:
const getAllEnrolledCourses = async (req,res) => {
    try{
        // const {userid} = req.params.id;
        const {userid, courseid} = req.body;
 
        const enrolledCourses = await enrollementModel.find({user: userid}).populate(courseid);

        if(enrolledCourses.length > 0){
            res.status(200).json({
                success: true,
                message: "Enrolled courses fetched successfully.",
                enrolledCourses
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: "No enrolled courses found."
            })
        }
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: "Error while fetching enrolled courses.",
            error: error.message
        })
    }
};

// get a single Enrollement:
const getSingleEnrollement = async (req,res) => {
    try{
        const {id} = req.params
        const {courseid} = req.body ;

        const enrollement = await enrollementModel.findById(id).populate(courseid);
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

// make a enrollement
const createEnrollement = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const exists = await enrollementModel.findOne({userId}).populate("courseId");
    if(exists){
      return res.status(400).json({
        success: false,
        message: "Enrollement already exists.",
        existingEnrollement: exists
      })
    }

    const newEnrollement = new enrollementModel({
      courseId,
      userId,
      completedAt: Date.now()
    });

    // Update the status in allCourses
    await courseModel.findByIdAndUpdate(courseId, { status: "enrolled already" });

    await newEnrollement.save();
    res.status(201).json({
      success: true,
      message: "Enrollement created successfully.",
      newEnrollement
    });
  } catch (error) {
     if (error.code === 11000) {
      return res.status(400).json({ message: "Enrollement already exists!" });
    }
    else{
      res.status(400).json({
        success: false,
        message: "Error while creating enrollement.",
        error: error.message
      })
    }
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
    if (!validStatuses.includes(status)) {
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
    } 
    else if (type === "enrollement") {
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

// CREATE completed course
const createCompletedCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const exists = await completedCourseModel.findOne({ userId, courseId });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Course already completed.",
        existingCompletedCourse: exists
      });
    }

    const newCompletedCourse = new completedCourseModel({
      userId,
      courseId,
      completedAt: Date.now(),
    });

    await newCompletedCourse.save();

    res.status(201).json({
      success: true,
      message: "Completed course created successfully.",
      completedCourse: newCompletedCourse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while creating completed course.",
      error: error.message
    });
  }
};

// get completed courses
const getCompletedCourses = async (req,res) => {
  try{
   const { userId } = req.params; // now from URL, not body

    const completedCourses = await completedCourseModel.find({userId});

    if(completedCourses.length > 0){
      res.status(200).json({
        success: true,
        message: "Completed courses fetched successfully.",
        completedCourses
      })
    }
    else{
      res.status(404).json({
        success: false,
        message: "No completed courses found."
      })
    }
  }
  catch(error){
    res.status(400).json({
      success: false,
      message: "Error while fetching completed courses.",
      error: error.message
    })
  }
}

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