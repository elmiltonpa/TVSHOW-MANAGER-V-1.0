import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = ({ user, setUser, setToken }) => {
  const location = useLocation().pathname;
  const [theme, setTheme] = useState(true);
  const handleTheme = () => {
    setTheme(!theme);
  };

  return (
    <div
      className={`bg-purpuraoscuro ${
        location == "/login" || location == "/register" ? "hidden" : "block"
      }  h-16 w-full drop-shadow-lg`}
    >
      <div className="w-[90vw] pl-36 bg-purpuraoscuro h-full flex justify-between items-center">
        <ul className="flex gap-5">
          <li className="">
            <Link className="text-blanco font-bold" to="/home">
              TVSHOW MANAGER
            </Link>
          </li>
        </ul>
        <div className="">
          <button
            onClick={handleTheme}
            className="bg-negro relative w-[100px] h-[40px] "
          >
            <div className="relative w-full">
              <div
                className={`${
                  theme
                    ? "bg-blanco transform translate-x-[110%] transition-transform duration-500 ease-out"
                    : "bg-amarillo2 transition-transform duration-500 ease-out"
                } absloute text-blanco h-[30px]  w-[30px] rounded-full left-[4px] z-10 top-[0px] `}
              ></div>
            </div>
          </button>
        </div>
        <ul className="flex mr-10 gap-5">
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
        </ul>
      </div>
    </div>
  );
};

export default Header;
