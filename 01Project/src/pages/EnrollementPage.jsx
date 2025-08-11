import { courseService } from '../import';
import EnrolledCourseDetails from '../components/EnrolledCourseDetails.jsx';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EnrollmentPage() {
    const { id } = useParams(); // this is the courseId from the URL
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);


    const enrolledCourses = useSelector((state) => state.courses.EnrolledCourses);
    console.log(enrolledCourses, "enrolledCourses in EnrollmentPage");

    useEffect(() => {
        const findEnrolledCourse = () => {
            try {
                if (Array.isArray(enrolledCourses) && enrolledCourses.length > 0) {
                    const found = enrolledCourses.find((course) => course.$id === id);
                    setCourse(found || null);
                }
            } catch (error) {
                console.error('Error finding enrolled course:', error);
            } finally {
                setLoading(false);
            }
        };

        findEnrolledCourse();
    }, [id, enrolledCourses]);
    
    console.log(course, "course in findEnrolledCourse");

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading && course ? (
                <EnrolledCourseDetails course={course} />
            ) : (
                !loading && <p>Enrolled Course not found</p>
            )}
        </>
    );
}

export default EnrollmentPage;
