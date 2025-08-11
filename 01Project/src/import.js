import appwriteService from './services/appwrite';
import courseService from './services/courseService';
import { addToEnrolledCourses,addToCompletedCourses,removeFromEnrolledCourses,fetchEnrolledCourses } from './features/courses/courseSlice';

import { setUser,removeUser } from './features/auth/authSlice';

export {
    appwriteService,
    courseService,
    setUser,
    removeUser,
    addToEnrolledCourses,
    addToCompletedCourses,
    removeFromEnrolledCourses,
    fetchEnrolledCourses,
};