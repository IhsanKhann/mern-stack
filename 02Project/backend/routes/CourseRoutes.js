// router.js
import express from "express";
import { 
    getAllCourses,
    getCourseById,
    createCourse, 
    createEnrollement,
    getAllEnrolledCourses,
    getSingleEnrollement,
    changeStatus,
    createCompletedCourse,
    deleteEnrollement,
    getCompletedCourses,
} from "./controllers/allCourseControllers.js";


const CourseRouter = express.Router();

// GET all courses
CourseRouter.get("/allCourses", getAllCourses);

// GET course by ID
CourseRouter.get("/course/:id", getCourseById);

// create a course:
CourseRouter.post("/addCourse",createCourse);

// get all Enrollements:
CourseRouter.get("/allEnrollements",getAllEnrolledCourses);

// get single enrollement
CourseRouter.get("/enrollement/:id",getSingleEnrollement);

//create an enrollement:
CourseRouter.post("/addEnrollement",createEnrollement) 

// change the status of the course upon a enrollement.
CourseRouter.patch("/changeStatus/:id",changeStatus);

// delete enrollement:
CourseRouter.delete("/deleteEnrollement/:id",deleteEnrollement);

// create Completed Course:
CourseRouter.post("/addCompletedCourse",createCompletedCourse);

// get all completed courses
CourseRouter.get("/getAllCompletedCourses/:userId",getCompletedCourses);


export default CourseRouter;
