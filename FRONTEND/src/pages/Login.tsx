import { useState } from "react";
import loginService from "../services/login";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/common/SEO";
import { useTranslation } from "react-i18next";

interface ErrorResponse {
  message?: string;
  error?: string;
}

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await loginService({ username, password });
      if (userData && userData.token && userData.username) {
        login(userData.token, userData.username);
      } else if (userData && (userData as any).message) {
        setError((userData as any).message);
      } else {
        setError(t("errors.AUTH_INVALID_CREDENTIALS"));
      }
    } catch (error: unknown) {
      const err = error as AxiosError<ErrorResponse>;
      const errorCode = err.response?.data?.error || err.response?.data?.message;
      
      if (errorCode && typeof errorCode === 'string') {
        // Try to translate the error code from backend
        const translated = t(`errors.${errorCode}`);
        // If translation doesn't exist, i18next usually returns the key itself.
        // We can check if it contains the namespace to fallback safely.
        setError(translated.includes('errors.') ? t("errors.UNKNOWN_ERROR") : translated);
      } else {
        setError(t("errors.UNKNOWN_ERROR"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary flex justify-center items-center h-screen overflow-y-auto px-3">
      <SEO
        title={t("login.title")}
        description="Login to your TvShowManager account to track your favorite series."
      />
      <div className="bg-background shadow-login shadow-primary-dark min-h-125 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col items-center py-8">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold pt-8 sm:pt-16 text-center px-4 uppercase">
          <Link to="/">{t("header.title")}</Link>
        </div>
        <div className="flex justify-around flex-col items-center h-full w-full px-4 sm:px-8">
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <div className="flex gap-y-5 flex-col">
              <div className="flex flex-col gap-y-2 items-center">
                <label className="text-base sm:text-lg font-semibold">
                  {t("login.username")}
                </label>
                <input
                  className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-primary border-primary"
                  placeholder={t("login.placeholder_user")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <label className="text-base sm:text-lg font-semibold">
                  {t("login.password")}
                </label>
                <input
                  type="password"
                  className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-primary border-primary"
                  placeholder={t("login.placeholder_pass")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex pt-5 h-[27.5px] text-error font-sans flex-col text-sm sm:text-base font-semibold items-center">
              {isLoading ? t("common.loading") : error ? error : " "}
            </div>
            <div className="items-center mt-10 flex flex-col justify-center">
              <button className="bg-gray-light hover:bg-primary hover:text-primary-pale text-primary-dark w-full py-1.25 text-lg sm:text-xl font-bold border-2 border-primary">
                {t("login.submit")}
              </button>
              <span className="text-xs sm:text-[13px] mt-2 font-semibold font-sans">
                {t("login.forgot")}
              </span>
            </div>
          </form>
          <div className="pb-4">
            <Link to="/register">
              <span className="text-sm sm:text-base">{t("login.create_account")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
