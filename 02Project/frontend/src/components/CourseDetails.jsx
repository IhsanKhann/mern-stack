import { useState, useEffect } from "react";

function CourseDetails({ course, userId }) {
    console.log("inside the course details: ", course,userId);

    const { _id, title, description, price, category, image, status } = course || {};
    const [courseStatus, setCourseStatus] = useState(status || "");

    // Fetch the latest status when course ID changes
    useEffect(() => {
        if (!_id) return;

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/course/${_id}`);
                const data = await res.json();

                if (data.success && data.course) {
                    setCourseStatus(data.course.status);
                }
            } catch (err) {
                console.error("Error checking course status:", err);
            }
        };

        checkStatus();
    }, [_id]);

    const handleEnroll = async () => {
        try {
            // Add enrollment
            const res = await fetch("/api/addEnrollement", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseId: _id,
                    userId,
                })
            });
            const data = await res.json();
            console.log("Enroll request sent:", _id, userId);
            console.log("Enroll response:", data);

            if (data.success) {
                // Update course status in backend
                const response = await fetch(`/api/changeStatus/${_id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        status: "enrolled already",
                        type:"course"
                     })
                });
                const responseData = await response.json();
                console.log("Status update response:", responseData);

                // Instant UI update
                setCourseStatus("enrolled already");
            }
        } catch (err) {
            console.error("Error enrolling:", err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
            {/* Course Image */}
            <div className="w-full h-64 rounded-xl overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mt-4">{title}</h1>

            {/* Category */}
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                    {category}
                </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>

            {/* Price & Enroll Button */}
            <div className="mt-6 flex justify-between items-center">
                <span className="text-2xl font-semibold text-green-600">
                    ${price}
                </span>
                <button
                    disabled={courseStatus === "enrolled already"}
                    onClick={handleEnroll}
                    className="bg-blue-500 font-bold text-[16px] text-white h-12 w-32 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-all"
                >
                    {courseStatus === "enrolled already" ? "Enrolled already" : "Enroll"}
                </button>
            </div>
        </div>
    );
}

export default CourseDetails;
