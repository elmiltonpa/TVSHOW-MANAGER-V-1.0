import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

const Header = ({ user, setUser, setToken }) => {
  const location = useLocation().pathname;
  const [theme, setTheme] = useState(false);

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
      className={`bg-purpuraoscuro ${
        location == "/login" || location == "/register" ? "hidden" : "block"
      }  h-14 w-full drop-shadow-lg`}
    >
      <div className="w-[92vw] pl-36 bg-purpuraoscuro h-full flex justify-between items-center">
        <ul className="flex gap-5">
          <li className="">
            <Link className="text-blanco font-bold" to="/home">
              TVSHOW MANAGER
            </Link>
          </li>
        </ul>

        <ul className="flex justify-between">
          <div className="flex mr-10 gap-5">
            {user ? (
              <>
                <li>
                  <Link
                    className="text-blanco font-semibold text-lg"
                    to={`/${user.username}`}
                  >
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <button
                      className="text-blanco font-semibold text-lg"
                      onClick={() => {
                        setToken(null);
                        setUser(null);
                        window.localStorage.removeItem("session");
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="text-blanco font-semibold" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li>
                  <Link className="text-blanco font-semibold" to="/register">
                    REGISTER
                  </Link>
                </li>
              </>
            )}
          </div>
          <div>
            <li className="">
              <div className="w-[60px] h-[34px] ">
                <button
                  onClick={handleTheme}
                  className={`${
                    theme ? "bg-blanco" : "bg-gris6"
                  } rounded-3xl flex justify-between relative w-full h-full`}
                >
                  <div
                    className={`${
                      theme
                        ? "bg-gris6 transform translate-x-[25px] transition-transform duration-500 ease-out"
                        : "bg-blanco transition-transform duration-500 ease-out"
                    } absolute top-[3px] left-1 text-white h-7 w-7 rounded-full`}
                  ></div>
                  <div
                    className={`${
                      theme ? "block" : "invisible"
                    } pt-[3px] pl-[1px]`}
                  >
                    <MdDarkMode className="dark:text-gris6" size={29} />
                  </div>
                  <div
                    className={`${theme ? "invisible" : "block"} pt-[5px] pr-1`}
                  >
                    <MdOutlineLightMode size={24} color="white" />
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
