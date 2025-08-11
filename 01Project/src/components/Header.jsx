// Header.jsx
import React from 'react';
import LogoutBtn from './Logoutbtn';

function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    {/* <img src="/logo.png" alt="Logo" className="h-8 w-8" /> */}
                    <h1 className="text-xl font-semibold text-gray-800">Learnify</h1>
                </div>

                {/* Navigation Links (Add your links here) */}
                <div className="hidden md:flex space-x-6">
                    {/* Example placeholders */}
                    {/* <a href="/courses" className="text-gray-600 hover:text-black">Courses</a> */}
                    {/* <a href="/about" className="text-gray-600 hover:text-black">About</a> */}
                    {/* <a href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</a> */}
                </div>

                {/* User Options */}
                <div className="flex items-center space-x-4">
                    {/* You can insert Profile image or dropdown menu here */}
                    <LogoutBtn />
                </div>
            </nav>
        </header>
    );
}

export default Header;
