import { Link, useLocation } from "react-router-dom";
const Header = ({ user, setUser, setToken }) => {
  const location = useLocation().pathname;

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
        <ul className="flex mr-10 gap-5">
          {user ? (
            <>
              <li>
                <Link className="text-blanco text-lg" to={`/${user.username}`}>
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button
                    className="text-blanco text-lg"
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
                <Link className="text-blanco" to="/login">
                  LOGIN
                </Link>
              </li>
              <li>
                <Link className="text-blanco" to="/register">
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
