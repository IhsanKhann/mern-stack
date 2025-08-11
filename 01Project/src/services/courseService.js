import config from '../config/config.js';
import {Client, Databases, ID, Permission, Role,Storage, Query} from 'appwrite';

// import { useSelector } from 'react-redux';
// function getUserId() {
//     const user = useSelector((state) => state.auth.user);
//     return user ? user.$id : null; // Return user ID or null if not authenticated
// }

class CourseService {
    client;
    databases;
    storage;
    // userId = getUserId();

    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(config.apiUrl)
            .setProject(config.projectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createCourse({title,description,price,thumbnail,instructor,userId}){
        try{
            await this.databases.createDocument(
                config.databaseId,
                config.collectionIdCourses,
                ID.unique(),
                {
                    title,
                    description,
                    price,
                    thumbnail,
                    instructor,
                    userId,
                },
                [
                    Permission.read(Role.user(userId)),
                    Permission.write(Role.user(userId)),
                ],
            )
        }
        catch(error){
            throw error;
            console.log(error.message);
        }
    }

   async createEnrollment({ courseId, userId, EnrolledAt}) {
    try {
        await this.databases.createDocument(
            config.databaseId,
            config.collectionIdEnrollements,
            ID.unique(),
            {
                courseId,
                userId,
                EnrolledAt: EnrolledAt || new Date().toISOString(),
                status: true, // Assuming 'status' is a boolean indicating active enrollment
                // these names should match your database schema
            },
            [
                Permission.read(Role.user(userId)),
                Permission.write(Role.user(userId)),
            ]
        );  
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // dashboard page -> fetching all enrolled courses
    async getEnrolledCourses(userId) {
    try {
        const enrolledCourses = await this.databases.listDocuments(
            config.databaseId,
            config.collectionIdEnrollements,
            [
                Query.equal("userId", userId),
                // Query.equal("status", true),
                // Assuming 'status' is a boolean indicating active enrollment,
            ]
        );
        return enrolledCourses;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // enrollement page -> fetching a particular course by id.
    async getEnrolledCoursesByCourseId(courseId,userId) {
    try {
        const response = await this.databases.listDocuments(
            config.databaseId,
            config.collectionIdEnrollements,
            [
                Query.equal("userId", userId),
                // Query.equal("courseId", courseId)
            ]
        );

        if (response.documents.length > 0) {
            return response.documents[0]; // return the document which includes the courseId
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting enrolled course by courseId:", error);
        return null;
    }
    }

    async getCourses(){
        try{
            const courses = await this.databases.listDocuments(
                config.databaseId,
                config.collectionIdCourses,
            );
            if(courses){
                return courses;
            }
        }
        catch(error){
            console.log(error.message);
            throw error;
        }
    }

   async getCourseById(courseId) {
  try {
    console.log("Fetching course with ID:", courseId);
    const course = await this.databases.getDocument(
      config.databaseId,
      config.collectionIdCourses,
     // 6894a932003933437b51
      courseId // ✅ Appwrite's internal document ID
    );
    return course;
  } catch (error) {
    console.error("Failed to fetch course by ID:", error.message);
    throw error;
  }
}

       async uploadThumbnail({file, userId}){
        try{
            const thumbnail = await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file,
                [
                    Permission.read(Role.user(userId)),
                    Permission.write(Role.user(userId)),
                ],
            );
            if(thumbnail){
                return thumbnail;
            }
        }
        catch(error){
            console.log(error.message);
            throw error;
        }
    }

    async uploadVideo({file, userId}){
        try{
            const video = await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file,
                [
                    Permission.read(Role.user(userId)),
                    Permission.write(Role.user(userId)),
                ],
            );
            if(video){
                return video;
            }
        }
        catch(error){
            throw error;
            console.log(error.message);
        }   
    }

    getPreviewThumbnail(fileId) {
        try{
            const preview = this.storage.getFilePreview(
            config.bucketId,
            fileId,
            800,      // width in pixels
            0,        // height (keeps aspect ratio when 0)
            'center', // crop gravity
            80,       // quality (0–100)
            null,     // optional other parameters
        );
        // This returns a full response object which contains `href`
            return preview.href;
        }
        catch(error){
            throw error;
            console.log(error.message);
        }
    }
}

const courseService = new CourseService();
export default courseService;

// create a course, get a course, get all courses, upload thumbnail, get Preview