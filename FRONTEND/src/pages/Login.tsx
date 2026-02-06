import { useState } from "react";
import loginService from "../services/login";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/common/SEO";
import { useTranslation } from "react-i18next";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

interface ErrorResponse {
  message?: string;
  error?: string;
}

const Login = () => {
  const [username, setUsername] = useState<string>(() => {
    return window.localStorage.getItem("remembered_username") || "";
  });
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userData = await loginService({ username, password, rememberMe });
      if (userData && userData.token && userData.username) {
        // Save username for future logins
        window.localStorage.setItem("remembered_username", userData.username);
        login(userData.token, userData.username);
      } else if (userData && (userData as any).message) {
        setError((userData as any).message);
      } else {
        setError(t("errors.AUTH_INVALID_CREDENTIALS"));
      }
    } catch (error: unknown) {
      const err = error as AxiosError<ErrorResponse>;
      const errorCode =
        err.response?.data?.error || err.response?.data?.message;

      if (errorCode && typeof errorCode === "string") {
        const translated = t(`errors.${errorCode}`);
        setError(
          translated.includes("errors.")
            ? t("errors.UNKNOWN_ERROR")
            : translated,
        );
      } else {
        setError(t("errors.UNKNOWN_ERROR"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] relative overflow-hidden px-4 py-12">
      <SEO
        title={t("login.title")}
        description="Login to your TvShowManager account to track your favorite series."
      />

      {/* Background decoration - more visible glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-[#222222] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-10 transition-all hover:border-white/20">
          <div className="flex flex-col items-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-primary tracking-tighter mb-2 drop-shadow-sm">
              <Link to="/home" className="hover:opacity-90 transition-opacity">{t("header.title")}</Link>
            </h1>
            <p className="text-white/60 text-sm font-medium uppercase tracking-widest">
              {t("login.title")}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                {t("login.username")}
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                  <FaUser size={18} />
                </div>
                <input
                  className="w-full bg-black/30 border-2 border-white/5 focus:border-primary/50 outline-none rounded-2xl py-3.5 pl-12 pr-4 transition-all text-white font-medium placeholder:text-white/20"
                  placeholder={t("login.placeholder_user")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                {t("login.password")}
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                  <FaLock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-black/30 border-2 border-white/5 focus:border-primary/50 outline-none rounded-2xl py-3.5 pl-12 pr-12 transition-all text-white font-medium placeholder:text-white/20"
                  placeholder={t("login.placeholder_pass")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center px-1">
              <label className="flex items-center gap-x-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <div className="w-5 h-5 border-2 border-white/20 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                  <svg
                    className="absolute top-1 left-1 w-3 h-3 text-white hidden peer-checked:block pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                  {t("login.remember_me")}
                </span>
              </label>
            </div>

            {error && (
              <div className="bg-error/20 border border-error/30 text-error-light text-sm font-bold py-3 px-4 rounded-xl text-center">
                {error}
              </div>
            )}

            <button
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                t("login.submit")
              )}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-white/50 text-sm font-medium">
              {t("login.no_account")}{" "}
              <Link
                to="/register"
                className="text-primary font-bold hover:text-primary-light transition-colors ml-1"
              >
                {t("login.create_account")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
