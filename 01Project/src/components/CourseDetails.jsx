import { useEffect, useState } from 'react';
import { courseService } from '../import';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CourseDetails({ course }) {
    const { title, description, price, thumbnail, instructor, $id , status} = course;
    const user = useSelector((state) => state.auth.user);
    const [isEnrolled,setEnrolled] = useState(false);

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
            transition: 'trnsform 0.3s',
        },
        thumbnail: {
            width: '40%',
            objectFit: 'contain',
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
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '8px',
            cursor: 'pointer',
            alignSelf: 'start',
        },
    };

    
    const onEnroll = async (courseId) => {
    if (!user) {
        toast.error("You need to log in to enroll.");
        return;
    }

    try {
        await courseService.createEnrollment({
            courseId,
            userId: user.$id,
            enrollmentDate: new Date().toISOString(),
        });

        toast.success("Enrollment successful!");
        setEnrolled(true); 

        } catch (error) {
        toast.error("Enrollment failed: " + error.message);
        }
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

                <button style={styles.button} onClick={() => onEnroll($id)} disabled={isEnrolled}>
                    {isEnrolled ? "Enrolled" : "Enroll Now"}
                </button>

            </div>
        </div>
    );
}

export default CourseDetails;
