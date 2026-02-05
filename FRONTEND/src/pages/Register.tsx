import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import register from "../services/register";
import { AxiosError } from "axios";
import SEO from "../components/common/SEO";
import { useTranslation } from "react-i18next";

interface RegisterErrorResponse {
  error: string;
}

const Register = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registered, setRegistered] = useState<string | null>(null);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await register({ name, username, password });
      if (user.status === 200) {
        setRegistered(user.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<RegisterErrorResponse>;
      const errorCode = err.response?.data?.error;
      
      if (errorCode && typeof errorCode === 'string') {
        const translated = t(`errors.${errorCode}`);
        setRegistered(translated.includes('errors.') ? t("errors.UNKNOWN_ERROR") : translated);
      } else {
        setRegistered(t("errors.UNKNOWN_ERROR"));
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-primary px-3">
      <SEO
        title={t("register.title")}
        description="Create a new account on TvShowManager and start tracking your favorite TV shows."
      />
      <div className="min-h-150 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col shadow-login shadow-primary-dark justify-evenly items-center bg-white py-8">
        <div className="text-2xl sm:text-3xl md:text-4xl pt-4 sm:pt-8 font-bold text-center px-4 uppercase">
          <Link to="/">{t("header.title")}</Link>
        </div>
        <form className="flex flex-col pb-6 sm:pb-10 justify-center items-center w-full px-4 sm:px-8">
          <div className="flex flex-col gap-y-3 w-full max-w-md">
            <div className="flex flex-col gap-y-1 justify-center items-center">
              <label className="text-lg sm:text-xl font-semibold">{t("register.name")}</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-primary border-primary"
                type="text"
                placeholder={t("register.placeholder_name")}
              />
            </div>
            <div className="flex flex-col gap-y-2 justify-center items-center">
              <label className="text-lg sm:text-xl font-semibold">
                {t("register.username")}
              </label>
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-primary border-primary"
                type="text"
                placeholder={t("register.placeholder_user")}
              />
            </div>

            <div className="flex flex-col gap-y-2 justify-center items-center">
              <label className="text-lg sm:text-xl font-semibold">
                {t("register.password")}
              </label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-primary border-primary"
                type="password"
                placeholder={t("register.placeholder_pass")}
              />
            </div>
          </div>
          <div className="h-5 flex justify-center items-center">
            {registered ? (
              <p className="font-semibold pt-5 text-sm sm:text-base text-center">
                {registered}
              </p>
            ) : null}
          </div>
          <button
            onClick={(e) => handleRegister(e)}
            className="bg-gray-light mt-10 hover:bg-primary hover:text-primary-pale text-primary-dark w-full max-w-md py-1.25 text-lg sm:text-xl font-bold border-2 border-primary"
          >
            {t("register.submit")}
          </button>
        </form>
        <div className="flex flex-col justify-center items-center pb-4">
          <h3 className="text-sm sm:text-base">{t("register.already_have_account")}</h3>
          <Link
            className="hover:bg-primary hover:text-primary-pale px-2 pb-1 font-semibold text-sm sm:text-base"
            to="/login"
          >
            {t("login.title")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
