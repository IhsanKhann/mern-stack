import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courseService } from '../import';
import CourseDetails from '../components/CourseDetails';

function CourseCard() {
    const { courseId } = useParams();

    const [course,setCourse] = useState(null);
    const [loading,setLoading] = useState(true);

    // fetch the course using the id.
    useEffect(() => {
        async function fetchCourse(){
            try{
                if(courseId) {
                    console.log("Fetching course with ID:", courseId);
                    const course = await courseService.getCourseById(courseId); 
                    if(course){
                        console.log("Course fetched:", course);
                        console.log("Course id:", course.$id);

                        console.log("Course fetched:", course);
                        setCourse(course);
                    }
                }
            }
            catch(error){
                console.log(error.message);
                throw error;
            }
            finally{
                setLoading(false);
            }
        }
        fetchCourse();
    },[courseId])
    
    return(
        <>
        {loading && <p>Loading...</p>}
        {course ? (
            <CourseDetails course={course} />
        ) : (
            <p>Course not found</p>
        )}
        </>
    )
}

export default CourseCard;