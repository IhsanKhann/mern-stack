import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

import { courseService } from '../import';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToEnrolledCourses, fetchEnrolledCourses } from '../import';

function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const enrolledCourses = useSelector((state) => state.courses.Enrolledcourses); // ✅ from Redux

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await courseService.getCourses();
                if (res) {
                    setCourses(res.documents);
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    useEffect(() => {
        dispatch(fetchEnrolledCourses());
    }, [dispatch]);

    const handleCourseClick = (course) => {
        navigate(`/Course/${course.$id}`);
    };

    const handleEnrollClick = (course) => {
        dispatch(addToEnrolledCourses(course));
        navigate(`/enrollements/${course.$id}`);
    };

    return (
        <div>
            <Header />
            <h1 style={styles.heading}>Available Courses</h1>

            <div style={styles.scrollContainer}>
                {loading ? (
                    <p style={styles.loading}>Loading courses...</p>
                ) : (
                    courses.map((course) => (
                        <img
                            key={course.$id}
                            src={course.thumbnail}
                            alt={course.title}
                            style={styles.thumbnail}
                            onClick={() => handleCourseClick(course)}
                        />
                    ))
                )}
            </div>

            <h2 style={styles.subheading}>Enrolled Courses</h2>
            <div style={styles.scrollContainer}>
                {enrolledCourses && enrolledCourses.length > 0 ? (
                    enrolledCourses.map((course) => (
                        <img
                            key={course.$id}
                            src={course.thumbnail}
                            alt={course.title}
                            style={styles.thumbnail}
                            onClick={() => handleEnrollClick(course)}
                        />
                    ))
                ) : (
                    <p style={styles.loading}>No enrolled courses.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    heading: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginLeft: '20px',
    },
    subheading: {
        fontSize: '22px',
        fontWeight: '600',
        margin: '30px 20px 10px',
    },
    scrollContainer: {
        display: 'flex',
        overflowX: 'auto',
        padding: '20px',
        gap: '20px',
        scrollBehavior: 'smooth',
    },
    thumbnail: {
        width: '250px',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    loading: {
        fontSize: '16px',
        padding: '20px',
    },
};

export default Dashboard;
