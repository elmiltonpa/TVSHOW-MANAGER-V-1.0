import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdDarkMode, MdLanguage } from "react-icons/md";
import { FaGithub, FaCode } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const location = useLocation().pathname;
  const [theme, setTheme] = useState(false);
  const { t, i18n } = useTranslation();

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

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div
      className={`bg-primary ${
        location == "/login" || location == "/register" ? "hidden" : "block"
      }  h-14 sm:h-16 w-full drop-shadow-lg`}
    >
      <div className="w-full px-2 sm:px-6 lg:px-36 bg-primary h-full flex justify-between items-center">
        <ul className="flex gap-1 sm:gap-5 items-center">
          <li className="">
            <Link
              className="text-background font-bold text-[11px] xs:text-xs sm:text-base md:text-lg whitespace-nowrap"
              to="/home"
            >
              {t("header.title")}
            </Link>
          </li>
          <li className="hidden md:flex gap-4 ml-4">
            <a
              href="https://github.com/elmiltonpa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background hover:text-warning transition-colors"
              title="GitHub Profile"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://github.com/elmiltonpa/TVSHOW-MANAGER"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background hover:text-warning transition-colors"
              title="Repository"
            >
              <FaCode size={20} />
            </a>
          </li>
        </ul>

        <div className="flex items-center">
          <ul className="flex items-center gap-1.5 xs:gap-2 sm:gap-4 md:gap-10 mr-1.5 xs:mr-2 sm:mr-4">
            {user ? (
              <li>
                <Link
                  className="text-background font-semibold text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap"
                  to={`/${user.username}`}
                >
                  {t("header.my_profile")}
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    className="text-background font-semibold text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap"
                    to="/login"
                  >
                    {t("header.login")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-background font-semibold text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap"
                    to="/register"
                  >
                    {t("header.register")}
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2 border-l border-background/20 pl-1.5 xs:pl-2">
            <div className="relative flex items-center bg-background/10 hover:bg-background/20 rounded-md px-1.5 py-1 transition-colors cursor-pointer">
              <MdLanguage className="text-background" size={16} />
              <span className="text-background font-bold text-[9px] xs:text-[10px] sm:text-xs uppercase ml-1">
                {i18n.language.substring(0, 2)}
              </span>
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                <option className="text-black" value="es">
                  Español
                </option>
                <option className="text-black" value="en">
                  English
                </option>
              </select>
            </div>

            <li className="list-none">
              <div className="w-10 h-6 xs:w-12 xs:h-7 sm:w-15 sm:h-8.5">
                <button
                  onClick={handleTheme}
                  className={`${
                    theme ? "bg-background" : "bg-background-dark"
                  } rounded-3xl flex justify-between relative w-full h-full`}
                >
                  <div
                    className={`${
                      theme
                        ? "bg-background-dark transform translate-x-4 xs:translate-x-5 sm:translate-x-6.25 transition-transform duration-500 ease-out"
                        : "bg-background transition-transform duration-500 ease-out"
                    } absolute top-0.5 sm:top-0.75 left-1 text-white h-4.5 w-4.5 xs:h-5 xs:w-5 sm:h-7 sm:w-7 rounded-full`}
                  ></div>
                  <div className="hidden xs:block pt-0.5 sm:pt-0.75 pl-px">
                    <MdDarkMode
                      className="dark:text-background-dark"
                      size={theme ? 18 : 0}
                    />
                  </div>
                  <div className="hidden xs:block pt-0.75 sm:pt-1.25 pr-1">
                    <MdOutlineLightMode size={theme ? 0 : 16} color="white" />
                  </div>
                </button>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
