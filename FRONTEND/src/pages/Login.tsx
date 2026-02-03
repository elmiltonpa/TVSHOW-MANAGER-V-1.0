import { useState, useEffect } from "react";
import loginService from "../services/login";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";

interface ErrorResponse {
  message?: string;
  error?: string;
}

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  useEffect(() => {
    document.title = "Login - TvShowManager";
  }, []);

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await loginService({ username, password });
      if (userData && userData.token && userData.username) {
        login(userData.token, userData.username);
      } else if (userData && (userData as any).message) {
        setError((userData as any).message);
      } else {
        setError("Invalid credentials");
      }
    } catch (error: unknown) {
      const err = error as AxiosError<ErrorResponse>;
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Error desconocido",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary flex justify-center items-center h-screen overflow-y-auto px-3">
      <div className="bg-background shadow-login shadow-primary-dark min-h-125 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col items-center py-8">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold pt-8 sm:pt-16 text-center px-4">
          <Link to="/">TVSHOW MANAGER</Link>
        </div>
        <div className="flex justify-around flex-col items-center h-full w-full px-4 sm:px-8">
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <div className="flex gap-y-5 flex-col">
              <div className="flex flex-col gap-y-2 items-center">
                <label className="text-base sm:text-lg font-semibold">
                  Username
                </label>
                <input
                  className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-primary border-primary"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <label className="text-base sm:text-lg font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-primary border-primary"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex pt-5 h-[27.5px] text-error font-sans flex-col text-sm sm:text-base font-semibold items-center">
              {isLoading ? "Loading..." : error ? error : " "}
            </div>
            <div className="items-center mt-10 flex flex-col justify-center">
              <button className="bg-gray-light hover:bg-primary hover:text-primary-pale text-primary-dark w-full py-1.25 text-lg sm:text-xl font-bold border-2 border-primary">
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
