import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import register from "../services/register";
import { AxiosError } from "axios";
import SEO from "../components/common/SEO";
import { useTranslation } from "react-i18next";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaIdCard } from "react-icons/fa";

interface RegisterErrorResponse {
  error: string;
}

const Register = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [registered, setRegistered] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistered(null);
    try {
      const user = await register({ name, username, password });
      if (user.status === 200) {
        setRegistered(
          user.data.message ||
            t("register.success_message") ||
            "Account created!",
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<RegisterErrorResponse>;
      const errorCode = err.response?.data?.error;

      if (errorCode && typeof errorCode === "string") {
        const translated = t(`errors.${errorCode}`);
        setRegistered(
          translated.includes("errors.")
            ? t("errors.UNKNOWN_ERROR")
            : translated,
        );
      } else {
        setRegistered(t("errors.UNKNOWN_ERROR"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] relative overflow-hidden px-4 py-12">
      <SEO
        title={t("register.title")}
        description="Create a new account on TvShowManager and start tracking your favorite TV shows."
      />

      {/* Background decoration - matching Login */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-[#222222] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-10 transition-all hover:border-white/20">
                    <div className="flex flex-col items-center mb-6">
                      <h1 className="text-3xl sm:text-4xl font-black text-primary tracking-tighter mb-2 drop-shadow-sm">
                        <Link to="/home" className="hover:opacity-90 transition-opacity">{t("header.title")}</Link>
                      </h1>
                      <p className="text-white/60 text-sm font-medium uppercase tracking-widest">
                        {t("register.title")}
                      </p>
                    </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                {t("register.name")}
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                  <FaIdCard size={18} />
                </div>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/30 border-2 border-white/5 focus:border-primary/50 outline-none rounded-2xl py-3.5 pl-12 pr-4 transition-all text-white font-medium placeholder:text-white/20"
                  type="text"
                  placeholder={t("register.placeholder_name")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                {t("register.username")}
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                  <FaUser size={18} />
                </div>
                <input
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/30 border-2 border-white/5 focus:border-primary/50 outline-none rounded-2xl py-3.5 pl-12 pr-4 transition-all text-white font-medium placeholder:text-white/20"
                  type="text"
                  placeholder={t("register.placeholder_user")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">
                {t("register.password")}
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                  <FaLock size={18} />
                </div>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-black/30 border-2 border-white/5 focus:border-primary/50 outline-none rounded-2xl py-3.5 pl-12 pr-12 transition-all text-white font-medium placeholder:text-white/20"
                  placeholder={t("register.placeholder_pass")}
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

            {registered && (
              <div
                className={`text-sm font-bold py-3 px-4 rounded-xl text-center ${
                  registered.includes("error") ||
                  registered.includes("incorrecto")
                    ? "bg-error/20 border border-error/30 text-error-light"
                    : "bg-success/20 border border-success/30 text-success"
                }`}
              >
                {registered}
              </div>
            )}

            <button
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 text-lg mt-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                t("register.submit")
              )}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-white/50 text-sm font-medium">
              {t("register.already_have_account")}{" "}
              <Link
                to="/login"
                className="text-primary font-bold hover:text-primary-light transition-colors ml-1"
              >
                {t("login.title")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
