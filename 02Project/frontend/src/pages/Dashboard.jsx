import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEnrolledCourses,
  fetchAllCourses,
  fetchCompletedCourse,
} from "../features/sliceEnrollement";
import { logout } from "../features/sliceUser";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");

  const user = useSelector((state) => state.auth.user);
  const {
    enrolledCourses,
    allCourses,
    completedCourses,
    loading,
    error,
  } = useSelector((state) => state.enrolledCourses);

  const enrolledRef = useRef(null);
  const allRef = useRef(null);
  const completedRef = useRef(null);

  // ✅ Get userId safely from Redux or localStorage
useEffect(() => {
  const id = user?._id || JSON.parse(localStorage.getItem("user"))?._id;
  if (id) {
    setUserid(id);
    dispatch(fetchEnrolledCourses(id));
    dispatch(fetchAllCourses());
    dispatch(fetchCompletedCourse(id));
  }
}, [user, dispatch]);


  console.log("completed courses: ", completedCourses);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnrolledClick = (id) => {
    console.log(id);
    navigate(`/enrolled-courses/${id}`);
  };

  const handleCourseClick = (id) => {
    navigate(`/courses/${id}`);
  };

  if (!userid) {
    return <p className="text-center text-red-500">No userId found</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // working on logout here:
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between align-center "> 

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
        <button onClick={handleLogout}
        className="pointer bg-red-500 text-white p-2 w-32 h-12 rounded-md font-bold text-xl hover:bg-red-700">
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div
          className="bg-blue-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition"
          onClick={() => scrollToSection(enrolledRef)}
        >
          <h2 className="text-xl font-semibold">Enrolled Courses</h2>
          <p className="text-3xl font-bold">{enrolledCourses.length}</p>
        </div>

        <div
          className="bg-green-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-green-600 transition"
          onClick={() => scrollToSection(allRef)}
        >
          <h2 className="text-xl font-semibold">All Courses</h2>
          <p className="text-3xl font-bold">{allCourses.length}</p>
        </div>

        <div
          className="bg-purple-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-purple-600 transition"
          onClick={() => scrollToSection(completedRef)}
        >
          <h2 className="text-xl font-semibold">Completed Courses</h2>
          <p className="text-3xl font-bold">{completedCourses.length}</p>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <section ref={enrolledRef} className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Enrolled Courses
        </h2>
        {enrolledCourses.length === 0 ? (
          <p className="text-gray-500">No enrolled courses.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enrolledCourses.map((item) => (
              <div
              // working here:
                key={item._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleEnrolledClick(item._id)}
              >
                <img
                  src={item.course.image}
                  alt={item.course.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.course.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Courses Section */}
      <section ref={allRef} className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">All Courses</h2>
        {allCourses.length === 0 ? (
          <p className="text-gray-500">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleCourseClick(course._id)}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Completed Courses Section */}
      <section ref={completedRef}>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Completed Courses
        </h2>
        {completedCourses.length === 0 ? (
          <p className="text-gray-500">No completed courses.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleEnrolledClick(course._id)}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
