import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload("/");
  };
  const handleNavToggle = () => {
    setNavOpen(!isNavOpen);
  };
  return (
    <>
      <nav
        className={`pt-3 pb-3 bg-cyan-900 border-gray-200 dark:bg-gray-900  ${
          scrolling ? "fixed top-0 w-full z-10" : ""
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://img.freepik.com/free-photo/stylized-french-flag-flame-ai-generated-image_268835-6122.jpg?t=st=1701495709~exp=1701499309~hmac=fc695f8a9dd9e463282a8c1f3746a99762486c2b137bb97665dcb479d4372805&w=1060"
              className="rounded-full w-10 h-10"
              alt=""
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
              Kerja.<span className=" text-red-700">in</span>
            </span>
          </a>
          <button
            onClick={handleNavToggle}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isNavOpen}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={` w-full  md:w-auto ${
              isNavOpen ? "block" : "hidden"
            } md:block`}
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-cyan-900 rounded-lg bg-cyan-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-cyan-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              {!Cookies.get("token") && (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
              )}
              {Cookies.get("token") && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
