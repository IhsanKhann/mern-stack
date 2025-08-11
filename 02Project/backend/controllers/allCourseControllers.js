// controllers/allCourseControllers.js
import courseModel from "../models/courseModel.js"; // <- make sure `.js` is added (if using ESM)
import enrollementModel from "../models/enrollementModel.js";
import completedCourseModel from "../models/completedCourseModel.js";

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
    
    // here we would check if the title exists already.
    // const existingCourse = await courseModel.findOne({title}); // we take them from db(collection) using a title.

    // if (existingCourse){
    //   return res.status(400).json({
    //     success: false,
    //     message: "Course with this title already exists.",
    //     existingCourse
    //   })
    // }

    // else part:
    const newCourse = new courseModel({
      title,
      description,
      price,
      image,
      category,
      duration,
      status:"Available",
    });
    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully.",
      newCourse
    });
  } catch (error) {
     if (error.code === 11000) {
      return res.status(400).json({ message: "Course already exists!" });
    }
    else{
      res.status(400).json({
        success: false,
        message: "Error while creating course.",
        error: error.message
      })
    }
  }
};

// get Enrollements:
const getAllEnrolledCourses = async (req,res) => {
    try{
        const enrolledCourses = await enrollementModel.find();
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
        const {id} = req.params;
        const enrollement = await enrollementModel.findById(id);
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
    const { courseId, title, description, price, category, image } = req.body;

    // TEMP: Only prevent if already in DB with status enrolled
    // const existingCourse = await enrollementModel.findOne({
    //   courseId,
    //   status: "enrolled"
    // });

    // if (existingCourse) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You have already enrolled in this course.",
    //     existingCourse
    //   });
    // }

    const newEnrollement = new enrollementModel({
      courseId,
      title,
      description,
      price,
      category,
      image,
      status: "enrolled"
    });

    // Update the status in allCourses
    await courseModel.findByIdAndUpdate(courseId, { status: "enrolled" });

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

// change the status of the courses upon a enrollement
// update and delete mostly using an id.
const changeStatusofCourse = async (req,res) => {
  try{
    const {id} = req.params;
    const {status} = req.body;

    const updateCourse = await courseModel.findById(id);
    if(updateCourse){
      
      updateCourse.status = status;
      await updateCourse.save();
        res.status(200).json({
        success: true,
        message: "Course status updated successfully.",
        updateCourse

      })
    }
    else{
        res.status(404).json({
        success: true,
        message: "Course status couldnt be updated.",
        updateCourse
      })
    }
  }
  catch(error){
    res.status(400).json({
      success: false,
      message: "Error while updating course status.",
      error: error.message
    })
  }
}

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
    const { id,title, description, price, category, image } = req.body;

    const newCompletedCourse = new completedCourseModel({
      courseId: id,
      title,
      description,
      price,
      category,
      image,
      status: "completed"
    });

    await newCompletedCourse.save();

    res.status(201).json({
      success: true,
      message: "Completed course created successfully.",
      completedCourse: newCompletedCourse
    });
  } catch (error) {
     if (error.code === 11000) {
      return res.status(400).json({ message: "Course already exists!" });
    }
    else{
      res.status(400).json({
        success: false,
        message: "Error while creating completed course.",
        error: error.message
      })
    }
  }
};

// get completed courses
const getCompletedCourses = async (req,res) => {
  try{
    const completedCourses = await completedCourseModel.find();
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
  changeStatusofCourse,
  deleteEnrollement,
  createCompletedCourse,
  getCompletedCourses,
};

