import { Link } from "react-router-dom";
import { Serie } from "../../types";
import { useTranslation } from "react-i18next";

interface WatchedProps {
  seriesWatched: Serie[];
}

const Watched = ({ seriesWatched }: WatchedProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white min-h-75 lg:h-full dark:bg-background-dark pb-5 flex flex-col overflow-y-auto gap-4">
      <h1 className="text-xl sm:text-2xl dark:text-gray-light text-center pt-2 font-bold text-primary">
        {t("profile.watched_series")}
      </h1>
      <div className="flex flex-col px-3 sm:px-5 gap-3 w-full">
        {seriesWatched.length > 0 ? (
          seriesWatched.map((serie) => (
            <div
              key={serie.id}
              className="dark:bg-surface-medium dark:shadow-seriefav dark:hover:bg-surface-hover flex shadow-seriefav h-14 sm:h-16 rounded-lg shadow-foreground"
            >
              <div className="w-full p-2">
                <Link to={`/home/${serie.tv_id}`}>
                  <h1 className="dark:text-white flex h-full text-sm sm:text-base md:text-lg text-center font-medium flex-col justify-center items-center">
                    {serie.tv_title}
                  </h1>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-lg sm:text-xl md:text-2xl dark:text-gray-light text-center px-2">
            {t("profile.no_watched")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watched;
