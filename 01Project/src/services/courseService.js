import config from '../config/config.js';
import {Client, Databases, ID, Permission, Role,Storage} from 'appwrite';

class CourseService {
    client;
    databases;
    storage;
    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(config.apiUrl)
            .setProject(config.projectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createCourse({title,description,price,image,userId}){

        try{
            await this.databases.createDocument(
                config.databaseId,
                config.collectionIdCourses,
                ID.unique(),
                {
                    title,
                    description,
                    price,
                    image,
                    // this is the thumbnail
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
            throw error;
            console.log(error.message);
        }
    }

    async getCourseById({courseId}){
        try{
            const course = await this.databases.getDocument(
                config.databaseId,
                config.collectionIdCourses,
                courseId,
            );
            if(course){
                return course;
            }
        }
        catch(error){
            throw error;
            console.log(error.message);
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

