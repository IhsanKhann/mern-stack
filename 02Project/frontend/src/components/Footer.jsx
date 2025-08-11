function Footer() {
  /**
   * A professional footer component styled with Tailwind CSS.
   */
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold text-white">Learnify</h1>
          <p className="text-sm">© 2025 Learnify. All rights reserved.</p>
        </div>
        <nav className="flex space-x-6 text-sm">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#courses" className="hover:text-white transition-colors">Courses</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;