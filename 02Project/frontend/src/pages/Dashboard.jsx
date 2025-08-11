import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchEnrolledCourses,
  fetchAllCourses,
  fetchCompletedCourse,
} from "../features/sliceEnrollement";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    enrolledCourses,
    allCourses,
    completedCourses,
    loading,
    error,
  } = useSelector((state) => state.enrolledCourses);

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchEnrolledCourses());
    dispatch(fetchCompletedCourse());
  }, [dispatch]);

  const scrollRefAll = useRef(null);
  const scrollRefEnrolled = useRef(null);
  const scrollRefCompleted = useRef(null);

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleClick = (course) => {
    navigate(`/courses/${course._id}`);
  };

  const handleEnrolledClick = (course) => {
    navigate(`/enrolled-courses/${course._id}`);
  };

  const Section = ({ title, color, courses, refObj, onClick }) => (
    <section>
      <h1
        className={`text-3xl font-bold mb-4`}
        style={{ color: color }}
      >
        {title}
      </h1>

      {loading && !courses.length && <p>Loading {title.toLowerCase()}...</p>}
      {!loading && error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {!loading && courses && courses.length > 0 ? (
        <div className="relative flex items-center">
          <button
            onClick={() => scrollLeft(refObj)}
            className="absolute left-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
          >
            ◀
          </button>

          <div
            ref={refObj}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {courses.map((course) => (
              <div
                key={course._id}
                onClick={() => onClick(course)}
                className="w-64 flex-shrink-0 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {course.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {course.description || "No description available."}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollRight(refObj)}
            className="absolute right-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
          >
            ▶
          </button>
        </div>
      ) : (
        !loading && <p className="text-gray-500">No {title.toLowerCase()} available</p>
      )}
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow px-6 py-8 space-y-12 max-w-7xl mx-auto">
        <Section
          title="All Courses"
          color="#2563eb" // blue-600
          courses={allCourses}
          refObj={scrollRefAll}
          onClick={handleClick}
        />

        <Section
          title="Enrolled Courses"
          color="#16a34a" // green-600
          courses={enrolledCourses}
          refObj={scrollRefEnrolled}
          onClick={handleEnrolledClick}
        />

        <Section
          title="Completed Courses"
          color="#9333ea" // purple-600
          courses={completedCourses}
          refObj={scrollRefCompleted}
          // onClick={handleClick}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
