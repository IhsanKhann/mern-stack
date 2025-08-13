import React from 'react'
import Header from '../components/Header';
import Footer from "../components/Footer";

import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";


function Home() {
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // just for testing..
  // useEffect(() => {
  //   fetch("http://localhost:5000/")
  //     .then((res) => res.text()) // or .json() if API returns JSON
  //     .then((data) => setMessage(data))
  //     .catch((err) => console.error("Fetch error:", err));
  // }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* header */}
      <Header />

      {/* main text and login and sign up buttons */}
      
      <main className="flex-grow flex flex-col justify-center items-center px-4 text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Learnify</h1>
        <p className="max-w-xl text-gray-600">
          Learnify is your go-to platform for mastering new skills and advancing your career with expert-led courses.
        </p>

        {/* buttons */}
        <div className="flex justify-center items-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
          onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
          onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          {/* <h2 className="text-gray-500 mt-4">{message}</h2> */}
        </div>
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Home;