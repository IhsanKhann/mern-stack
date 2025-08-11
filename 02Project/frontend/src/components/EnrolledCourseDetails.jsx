import { useNavigate } from "react-router-dom";

function EnrolledCourseDetails({ course }) {
    const { _id, title, description, price, category, image, status } = course;
    const navigate = useNavigate();

  const handleCompleteClick = async () => {
    try {
      // 1. Create completed course
      const res = await fetch(`http://localhost:5000/api/addCompletedCourse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id,title, description, price, category, image })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // 2. Delete enrollment
      await fetch(`http://localhost:5000/api/deleteEnrollement/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id })
      });

      alert("Course marked as completed!");
      //navigate to dashboard
       navigate("/dashboard");
       window.location.reload();

    } catch (error) {
      console.error("Error completing course:", error);
      alert("Failed to complete the course.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-8">
      <div className="w-full h-64">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <span className="text-lg font-semibold text-green-600">${price}</span>
        </div>

        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full mb-4">
          {category}
        </span>

        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

        <div className="flex gap-4">
          <button
            disabled
            className={`px-4 py-2 rounded-lg font-medium ${
              status === "enrolled"
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {status === "enrolled" ? "Enrolled ✅" : "Not Enrolled"}
          </button>

          <button
            onClick={handleCompleteClick}
            className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-all"
          >
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourseDetails;
