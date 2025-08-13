import EnrolledCourseDetails from "../components/EnrolledCourseDetails";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

// here we fetch the single enrolled Course.
function EnrolledCourses(){
    const {id} = useParams(); // this to get the singleEnrolledCourse

    const [course,setCourse] = useState({});
    const user = useSelector((state) => state.auth.user);
    const [userId,setUserId] = useState(user?._id) ;
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchSingleEnrolledCourse = async()=>{
            try{
                if(!id){
                    console.log(id) ;
                    return ;
                } 

                if(id){
                    console.log(id) ;
                    const response = await fetch(`http://localhost:5000/api/enrollement/${id}`,{
                        method:"GET",
                        headers:{
                            "Content-Type":"application/json"
                        }
                    });
                    const data = await response.json();
                    console.log(data);

                    if(data.success){
                        setCourse(data.enrollement.course);
                        setLoading(false);
                        console.log("enrolled course using data.enrollement.course :",data.enrollement.course);
                        console.log("fetched data : ", data.enrollement);
                    }
                }
            }
            catch(error){
                console.log(error);
                setLoading(false);
                throw error;
            }
        }
        fetchSingleEnrolledCourse();
        console.log("course in the enrolled courses:" , course);
    },[id])

    return(
        <>
            {loading ? <p>Loading...</p> : <EnrolledCourseDetails course={course} userId={userId}/>}
        </>
    )
} 

export default EnrolledCourses;