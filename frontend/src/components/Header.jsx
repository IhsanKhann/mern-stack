import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">

        <nav className="flex items-center w-full">
        <div className="text-2xl font-bold">
            Logo        
        </div>  

          <button
            id="toggleOpen"
            onClick={toggleMenu}
            className="lg:hidden cursor-pointer"
          >
            {/* hamburger icon */}
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M3 5h14M3 10h14M3 15h14"
                clipRule="evenodd" />
            </svg>
          </button>

          {/* Large screens menu */}
          <ul className="hidden lg:flex gap-x-4 ml-auto">
            <li>
              <Link to="/dashboard" className="hover:text-blue-700 text-slate-900 font-medium text-[15px]">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-700 text-slate-900 font-medium text-[15px]">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-blue-700 text-slate-900 font-medium text-[15px]">
                Signup
              </Link>
            </li>
            <li>
              {/* <Link to="/blog" className="hover:text-blue-700 text-slate-900 font-medium text-[15px]">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-700 text-slate-900 font-medium text-[15px]">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-700 text-slate-900 font-medium text-[15px]">
                Contact
              </Link> */}
            </li>
          </ul>

          {/* Mobile menu overlay */}
          {menuOpen && (
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleMenu}></div>
          )}
          <ul className={`fixed top-0 left-0 bg-white p-6 h-full shadow-md overflow-auto z-50 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform lg:hidden w-1/2 min-w-[300px]`}>
            <li className="mb-6">
              <Link to="/" onClick={toggleMenu}>
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
              </Link>
            </li>
            <li className="py-3 border-b border-gray-300">
              <Link to="/dashboard" onClick={toggleMenu} className="hover:text-blue-700 text-blue-700 block font-medium text-[15px]">
                Dashboard
              </Link>
            </li>
            <li className="py-3 border-b border-gray-300">
              <Link to="/login" onClick={toggleMenu} className="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">
                Login
              </Link>
            </li>
            <li className="py-3 border-b border-gray-300">
              <Link to="/signup" onClick={toggleMenu} className="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">
                Signup
              </Link>
            </li>
            <li className="py-3 border-b border-gray-300">
              <Link to="/blog" onClick={toggleMenu} className="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">
                Blog
              </Link>
            </li>
            <li className="py-3 border-b border-gray-300">
              <Link to="/about" onClick={toggleMenu} className="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">
                About
              </Link>
            </li>
            <li className="py-3 border-b border-gray-300">
              <Link to="/contact" onClick={toggleMenu} className="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
