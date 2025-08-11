import EnrolledCourseDetails from "../components/EnrolledCourseDetails";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";

// here we fetch the single enrolled Course.
function EnrolledCourses(){
    const {id} = useParams();
    const [course,setCourse] = useState({});

    useEffect(()=>{
        const fetchSingleEnrolledCourse = async()=>{
            try{
                if(!id) return ;

                if(id){
                    const response = await fetch(`http://localhost:5000/api/enrollement/${id}`);

                    const data = await response.json();
                    setCourse(data.enrollement);
                }
            }
            catch(error){
                console.log(error);
                throw error;
            }
        }
        fetchSingleEnrolledCourse();
    },[id])

    return(
        <>
            <EnrolledCourseDetails course={course}/>
        </>
    )
} 

export default EnrolledCourses;