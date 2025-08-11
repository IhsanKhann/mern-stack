import { useEffect,useState } from "react";
function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading,setLoading] = useState(true);

    // this is to fetch all the courses.
  useEffect(() => {
    const getCourses = async () => {
        try{
            const res = await fetch("http://localhost:5000/api/allCourses");
            const data = await res.json();
            setLoading(false);

            console.log("Fetched courses:", data);
            setCourses(data.allCourses);
        }
        catch(err){
            console.error("Fetch error:", err);
            setLoading(true);
        }
    }

    getCourses();

  }, []);

  return {courses,loading};
}

export default useCourses;