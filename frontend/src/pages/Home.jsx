import React from 'react'
import Header from '../components/Header';
import Footer from "../components/Footer";

import { useState, useEffect } from 'react';

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text()) // or .json() if API returns JSON
      .then((data) => setMessage(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center px-4 text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Learnify</h1>
        <p className="max-w-xl text-gray-600">
          Learnify is your go-to platform for mastering new skills and advancing your career with expert-led courses.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition">
          Login
        </button>
        <h2 className="text-gray-500 mt-8">{message}</h2>
      </main>
      <Footer />
    </div>
  );
}

export default Home;