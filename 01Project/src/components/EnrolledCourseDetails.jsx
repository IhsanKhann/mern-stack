import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCompletedCourses } from '../import';
// import { toast } from 'react-toastify';

function EnrolledCourseDetails({ course }) {
    const { title, description, price, thumbnail, instructor, $id } = course;

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const completedCourses = useSelector((state) => state.courses.CompletedCourses);

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        // Check if the course is already in completed list
        const isAlreadyCompleted = completedCourses.some(c => c.$id === $id);
        setIsCompleted(isAlreadyCompleted);
    }, [completedCourses, $id]);

    const markAsCompleted = () => {
        dispatch(addToCompletedCourses(course));
        setIsCompleted(true);
        toast.success(`${title} marked as completed!`);
    };

    const styles = {
        card: {
            width: '100%',
            maxWidth: '1000px',
            margin: 'auto',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#fff',
            overflow: 'hidden',
            transition: 'transform 0.3s',
        },
        thumbnail: {
            width: '40%',
            objectFit: 'cover',
        },
        content: {
            padding: '24px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '8px',
        },
        instructor: {
            fontSize: '16px',
            color: '#666',
            marginBottom: '12px',
        },
        description: {
            fontSize: '15px',
            color: '#444',
            marginBottom: '16px',
            lineHeight: '1.6',
        },
        price: {
            backgroundColor: '#f3f4f6',
            color: '#111',
            padding: '6px 12px',
            borderRadius: '8px',
            fontWeight: '600',
            display: 'inline-block',
            marginBottom: '16px',
        },
        button: {
            backgroundColor: isCompleted ? '#16a34a' : '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '8px',
            cursor: isCompleted ? 'default' : 'pointer',
            alignSelf: 'start',
        },
    };

    return (
        <div key={$id} style={styles.card}>
            <img src={thumbnail} alt={title} style={styles.thumbnail} />
            <div style={styles.content}>
                <div>
                    <h2 style={styles.title}>{title}</h2>
                    <p style={styles.instructor}>Instructor: {instructor}</p>
                    <p style={styles.description}>{description}</p>
                    <span style={styles.price}>Price: ${price}</span>
                </div>
                <button
                    style={styles.button}
                    onClick={markAsCompleted}
                    disabled={isCompleted}
                >
                    {isCompleted ? "Completed" : "Mark as Completed"}
                </button>
            </div>
        </div>
    );
}

export default EnrolledCourseDetails;
