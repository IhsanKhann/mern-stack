import EnrolledCourseDetails from "../components/EnrolledCourseDetails";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

// here we fetch the single enrolled Course.
function EnrolledCourses(){
    const {id} = useParams(); // this to get the singleEnrolledCourse

    const [course,setCourse] = useState({});
    const {user} = useSelector((state) => state.user.User);
    const [userId,setUserId] = useState(user?._id) ;

    useEffect(()=>{
        const fetchSingleEnrolledCourse = async()=>{
            try{
                if(!id) return ;

                if(id){
                    const response = await fetch(`/api/enrollement/${id}`);

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
            <EnrolledCourseDetails course={course} userId={userId}/>
        </>
    )
} 

export default EnrolledCourses;