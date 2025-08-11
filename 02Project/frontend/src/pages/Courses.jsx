import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import CourseDetails from "../components/CourseDetails";
import { useSelector } from "react-redux";

function Courses() {
    const {id} = useParams(); // this to get the singleCourse

    const [course,setCourse] = useState({});
    const {user} = useSelector((state) => state.user.User);
    const [userId,setUserId] = useState(user?._id);

    useEffect(()=>{
        const fetchCourse = async () => {
            try{
                if (!id) return ;
                
                if(id){
                    console.log(id);

                    const res = await fetch(`/api/course/${id}`);
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
            <CourseDetails course={course} userId={userId}/>
        </>
    )
}

export default Courses;
