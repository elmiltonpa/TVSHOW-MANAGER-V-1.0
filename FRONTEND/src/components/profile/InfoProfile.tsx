import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface InfoProfileProps {
    username: string;
}

const InfoProfile = ({ username }: InfoProfileProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dark:bg-accent-purple min-h-[200px] lg:h-full bg-accent-light flex flex-col items-center">
      <h1 className="flex justify-center text-2xl sm:text-3xl md:text-4xl py-4 sm:py-2 font-medium">
        {username}
      </h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors"
      >
        {t("profile.logout")}
      </button>
    </div>
  );
};

export default InfoProfile;