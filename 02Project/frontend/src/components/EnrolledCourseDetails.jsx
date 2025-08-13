import { useNavigate } from "react-router-dom";

function EnrolledCourseDetails({ course,userId }) {
    console.log("inside the enrolled course details: ", course,userId) ;

    const { _id, title, description, price, category, image, status } = course || {} ;
    const navigate = useNavigate();

  const handleCompleteClick = async () => {
    try {
      // 1. Create completed course
      const res = // create completed
      await fetch("/api/addCompletedCourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId: _id })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // change enrollement status: you probably need enrollement id. If you want to change course status use type "course" and pass course id.
      await fetch(`/api/changeStatus/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed", type: "enrollement" })
      });

      // 3. Delete enrollment
      await fetch(`/api/deleteEnrollement/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id })
      });

      // change the status of the course to available
      await fetch(`/api/changeStatus/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "available", type: "course" })
      });

      // 4. Refresh dashboard
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
        <img src={image || "no image"} alt={title || "no image title"} className="w-full h-full object-cover" />

      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-800">{title || "no title"}</h1>
          <span className="text-lg font-semibold text-green-600">${price || "no price"}</span>
        </div>

        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full mb-4">
          {category || "no category"}
        </span>

        <p className="text-gray-600 leading-relaxed mb-6">{description || "no description"}</p>

        <div className="flex gap-4">
          <button
            disabled
            className={`px-4 py-2 rounded-lg font-medium ${
              status === "enrolled"
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {status === "completed" ? "Completed ✅" : "Not Completed"}
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
