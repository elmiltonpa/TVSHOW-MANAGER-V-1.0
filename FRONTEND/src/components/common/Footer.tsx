import { Link } from "react-router-dom";
import { FaGithub, FaCode } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-primary dark:bg-black text-white py-8 px-4 sm:px-8 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h2 className="text-2xl font-bold tracking-wider">{t("header.title")}</h2>
          <p className="text-sm text-gray-200 dark:text-gray-400 max-w-xs">
            {t("footer.description")}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2 text-warning">
            {t("footer.navigation")}
          </h3>
          <Link to="/" className="hover:text-warning transition-colors text-sm">
            {t("footer.home")}
          </Link>
          <Link
            to="/myseries"
            className="hover:text-warning transition-colors text-sm"
          >
            {t("footer.my_series")}
          </Link>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-4">
          <h3 className="text-lg font-semibold text-warning">{t("footer.connect")}</h3>
          <div className="flex space-x-6">
            <a
              href="https://github.com/elmiltonpa/TVSHOW-MANAGER"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-warning transition-transform hover:scale-110"
              aria-label="GitHub Repository"
            >
              <FaCode />
            </a>
            <a
              href="https://github.com/elmiltonpa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-warning transition-transform hover:scale-110"
              aria-label="My GitHub Profile"
            >
              <FaGithub />
            </a>
          </div>
          <div className="text-xs text-gray-300 dark:text-gray-500 mt-2">
            {t("footer.developed_by")}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs text-gray-300 dark:text-gray-500">
        &copy; {currentYear} TvShowManager. {t("footer.rights")}
      </div>
    </footer>
  );
};

export default Footer;
