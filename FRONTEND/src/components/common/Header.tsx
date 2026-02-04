import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { FaGithub, FaCode } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const location = useLocation().pathname;
  const [theme, setTheme] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const themeInLocalStorage = window.localStorage.getItem("theme");
    if (themeInLocalStorage) {
      if (themeInLocalStorage === "light") {
        setTheme(false);
        document.documentElement.classList.remove("dark");
      } else {
        window.localStorage.setItem("theme", "dark");
        setTheme(true);
        document.documentElement.classList.add("dark");
      }
    } else {
      window.localStorage.setItem("theme", "light");
    }
  }, []);

  const handleTheme = () => {
    if (theme) {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
    setTheme(!theme);
  };

  return (
    <div
      className={`bg-primary ${
        location == "/login" || location == "/register" ? "hidden" : "block"
      }  h-14 sm:h-16 w-full drop-shadow-lg`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-36 bg-primary h-full flex justify-between items-center">
        <ul className="flex gap-2 sm:gap-5 items-center">
          <li className="">
            <Link
              className="text-background font-bold text-sm sm:text-base md:text-lg"
              to="/home"
            >
              TVSHOW MANAGER
            </Link>
          </li>
          {/* GitHub Links visible on larger screens or always if preferred. 
              Let's keep them visible but subtle. */}
          <li className="hidden sm:block ml-4">
             <a 
              href="https://github.com/miltondw/tvshow-manager" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background hover:text-warning transition-colors"
              title="Repository"
            >
              <FaCode size={20} />
            </a>
          </li>
          <li className="hidden sm:block">
             <a 
              href="https://github.com/miltondw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background hover:text-warning transition-colors"
              title="My Profile"
            >
              <FaGithub size={20} />
            </a>
          </li>
        </ul>

        <ul className="flex justify-between items-center">
          <div className="flex mr-2 sm:mr-4 md:mr-10 gap-2 sm:gap-3 md:gap-5 items-center">
            {/* Mobile-only repo links could go here if needed, but keeping it simple for now */}
            
            {user ? (
              <li>
                <Link
                  className="text-background font-semibold text-xs sm:text-sm md:text-base lg:text-lg"
                  to={`/${user.username}`}
                >
                  MI PERFIL
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    className="text-background font-semibold text-xs sm:text-sm md:text-base lg:text-lg"
                    to="/login"
                  >
                    LOGIN
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-background font-semibold text-xs sm:text-sm md:text-base lg:text-lg"
                    to="/register"
                  >
                    REGISTER
                  </Link>
                </li>
              </>
            )}
          </div>
          <div>
            <li className="">
              <div className="w-12.5 h-7 sm:w-15 sm:h-8.5">
                <button
                  onClick={handleTheme}
                  className={`${
                    theme ? "bg-background" : "bg-background-dark"
                  } rounded-3xl flex justify-between relative w-full h-full`}
                >
                  <div
                    className={`${
                      theme
                        ? "bg-background-dark transform translate-x-5.25 sm:translate-x-6.25 transition-transform duration-500 ease-out"
                        : "bg-background transition-transform duration-500 ease-out"
                    } absolute top-[2px] sm:top-[3px] left-1 text-white h-6 w-6 sm:h-7 sm:w-7 rounded-full`}
                  ></div>
                  <div
                    className={`${
                      theme ? "block" : "invisible"
                    } pt-[2px] sm:pt-[3px] pl-[1px]`}
                  >
                    <MdDarkMode
                      className="dark:text-background-dark"
                      size={24}
                    />
                  </div>
                  <div
                    className={`${theme ? "invisible" : "block"} pt-[3px] sm:pt-[5px] pr-1`}
                  >
                    <MdOutlineLightMode size={20} color="white" />
                  </div>
                </button>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
