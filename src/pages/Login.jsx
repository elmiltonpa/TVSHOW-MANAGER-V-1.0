import { useState, useEffect } from "react";
import login from "../services/login";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setUser, setToken }) => {
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - TvShowManager";
    const session = JSON.parse(localStorage.getItem("session"));
    if (session && session.expirationDate > Date.now()) {
      navigate("/home");
    }
  }, [navigate]);

  const setSessionInLocalStorage = (user) => {
    const sessionDurationInSeconds = 950400;
    const expirationDate = Date.now() + sessionDurationInSeconds * 1000;

    const session = {
      token: user.token,
      username: user.username,
      expirationDate,
    };

    window.localStorage.setItem("session", JSON.stringify(session));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login({ username, password }).then((res) => res);
      if (user) {
        setUser({ username: user.username });
        setToken(user.token);
        setSessionInLocalStorage(user);
        navigate("/");
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="bg-purpuraoscuro flex justify-center items-center h-screen overflow-y-auto px-3">
      <div className="bg-blanco shadow-login shadow-negropurpura min-h-[500px] w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col items-center py-8">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold pt-8 sm:pt-16 text-center px-4">
          <Link to="/">TVSHOW MANAGER</Link>
        </div>
        <div className="flex justify-around flex-col items-center h-full w-full px-4 sm:px-8">
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <div className="flex gap-y-5 flex-col">
              <div className="flex flex-col gap-y-2 items-center">
                <label className="text-base sm:text-lg font-semibold">Username</label>
                <input
                  className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-purpuraoscuro border-purpuraoscuro"
                  placeholder="Your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <label className="text-base sm:text-lg font-semibold">Password</label>
                <input
                  type="password"
                  className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-purpuraoscuro border-purpuraoscuro"
                  placeholder="Your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex pt-5 h-[27.5px] text-rojo font-sans flex-col text-sm sm:text-base font-semibold items-center">
              {isLoading ? (
                "Loading..."
              ) : error ? (
                error.response?.data?.message || "Error desconocido"
              ) : (
                " "
              )}
            </div>
            <div className="items-center mt-10 flex flex-col justify-center">
              <button className="bg-gris hover:bg-purpuraoscuro hover:text-lavanda text-negropurpura w-full py-[5px] text-lg sm:text-xl font-bold border-2 border-purpuraoscuro">
                Login
              </button>
              <span className="text-xs sm:text-[13px] mt-2 font-semibold font-sans">
                Forgot your password?
              </span>
            </div>
          </form>
          <div className="pb-4">
            <Link to="/register">
              <span className="text-sm sm:text-base">Create a new account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
