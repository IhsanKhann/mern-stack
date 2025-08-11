import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                    Welcome to <span className="text-blue-600">Learnify</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-6">
                    Unlock your potential. Learn anything, anytime, from anywhere.<br />
                    Dive into curated courses, track your progress, and grow your skills at your own pace.
                </p>

                <blockquote className="italic text-gray-500 mb-8">
                    “Learning never exhausts the mind.” – Leonardo da Vinci
                </blockquote>

                {!isAuthenticated && (
                    <Link
                        to="/dashboard"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition duration-300"
                    >
                        View our courses
                    </Link>
                )}
            </main>
        </div>
    );
}

export default Home;
