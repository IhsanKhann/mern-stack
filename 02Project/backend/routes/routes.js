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
} from "../controllers/allCourseControllers.js";

import { Login, SignUp, getCurrentUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// GET all courses
router.get("/allCourses", getAllCourses);

// GET course by ID
router.get("/course/:id", getCourseById);

// create a course:
router.post("/addCourse",createCourse);

// get all Enrollements:
router.get("/allEnrollements/:userId",getAllEnrolledCourses);

// get single enrollement
router.get("/enrollement/:id",getSingleEnrollement);

//create an enrollement:
router.post("/addEnrollement",createEnrollement) 

// change the status of the course upon a enrollement.
router.patch("/changeStatus/:id",changeStatus);

// delete enrollement:
router.delete("/deleteEnrollement/:id",deleteEnrollement);

// create Completed Course:
router.post("/addCompletedCourse",createCompletedCourse);

// get all completed courses
router.get("/getAllCompletedCourses/:userId",getCompletedCourses);

// now the user routes:
router.post("/login", Login);
router.post("/signup", SignUp);
router.get("/getUser", verifyToken, getCurrentUser);

export default router;
