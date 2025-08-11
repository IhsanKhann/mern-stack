import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Logo & Brand */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">Learnify</h2>
                        <p className="text-sm">Empowering your learning journey.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#" className="hover:text-white transition">Courses</a></li>
                            <li><a href="#" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition">Facebook</a>
                            <a href="#" className="hover:text-white transition">Twitter</a>
                            <a href="#" className="hover:text-white transition">GitHub</a>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Learnify. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
