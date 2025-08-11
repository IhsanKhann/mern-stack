import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import CourseDetails from "../components/CourseDetails";

function Courses() {
    const {id} = useParams();
    const [course,setCourse] = useState({});
 
    // fetch single course here or do it using the customHook.

    useEffect(()=>{
        const fetchCourse = async () => {
            try{
                if (!id) return ;
                
                if(id){
                    console.log(id);

                    const res = await fetch(`http://localhost:5000/api/course/${id}`);
                    const data = await res.json();
                    
                    console.log("fetched data: ", data);
                    setCourse(data.course);
                    
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchCourse();
    },[id])

    return(
        <>
            <CourseDetails course={course}/>
        </>
    )
}

export default Courses;
