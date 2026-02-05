import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSeries from "../../utils/useSeries";
import { Serie } from "../../types";
import { useTranslation } from "react-i18next";

const BASE_URL = "https://image.tmdb.org/t/p/w500/";

interface SerieCardProps {
  serie: Serie;
  setSeriesAdded: React.Dispatch<React.SetStateAction<number[]>>;
  seriesAdded: number[];
  isLoadingToFavorite: boolean;
  setIsLoadingToFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  onFavoriteToggle?: (serieId: number, isFavorite: boolean) => void;
}

const SerieCard = memo(
  ({
    serie,
    setSeriesAdded,
    seriesAdded,
    isLoadingToFavorite,
    setIsLoadingToFavorite,
  }: SerieCardProps) => {
    const navigate = useNavigate();
    const { handleSubmit } = useSeries();
    const { t } = useTranslation();

    const tmdbId = serie.id ? Number(serie.id) : serie.tv_id;
    const isFavorite = seriesAdded.includes(tmdbId);

    const handleFavoriteClick = useCallback(
      (e: React.MouseEvent) => {
        handleSubmit(
          e,
          tmdbId,
          setSeriesAdded,
          seriesAdded,
          setIsLoadingToFavorite,
        );
      },
      [tmdbId, setSeriesAdded, seriesAdded, setIsLoadingToFavorite, handleSubmit],
    );

    const handleDetailsClick = useCallback(() => {
      navigate(`/home/${tmdbId}`);
    }, [navigate, tmdbId]);

    return (
      <div className="flex flex-col md:flex-row my-3 w-full bg-background dark:bg-surface-dark">
        <div className="md:w-[78%] w-full md:border-r-4 border-gray-medium dark:border-background-dark">
          <div className="h-full flex flex-col sm:flex-row gap-2">
            <div className="flex justify-center items-center sm:items-start">
              <img
                loading="lazy"
                className="h-auto w-full sm:w-auto sm:h-[300px] object-cover"
                src={BASE_URL + serie.poster_path}
                alt={serie.name}
              />
            </div>
            <div className="flex flex-col flex-1 px-3 sm:px-5 py-3 justify-between items-center">
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl dark:text-text-muted font-black font-lato text-center">
                  {serie.name}
                </h1>
                <p className="text-sm sm:text-base overflow-hidden line-clamp-[7] dark:text-text-muted font-overview text-center">
                  {serie.overview}
                </p>
              </div>
              <div className="items-center border-t-2 dark:border-background-dark w-full flex justify-center mt-3 pt-2">
                {isFavorite ? (
                  <button
                    disabled={isLoadingToFavorite}
                    onClick={handleFavoriteClick}
                    className={`${
                      isLoadingToFavorite
                        ? "cursor-not-allowed text-warning-muted dark:text-accent-purple"
                        : "hover:bg-primary dark:text-accent-purple dark:hover:bg-white hover:text-background text-warning-muted"
                    } text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-10 py-2 font-semibold`}
                  >
                    {t("home.remove_from_favorites")}
                  </button>
                ) : (
                  <button
                    disabled={isLoadingToFavorite}
                    onClick={handleFavoriteClick}
                    className={`${
                      isLoadingToFavorite
                        ? "cursor-not-allowed dark:text-warning text-primary"
                        : "hover:bg-primary dark:text-warning dark:hover:bg-white dark:hover:text-primary hover:text-background text-primary"
                    } text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-10 py-2 font-semibold`}
                  >
                    {t("home.add_to_favorites")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[22%] w-full bg-primary py-3 px-5">
          <div className="flex md:flex-col flex-row md:h-full justify-between md:justify-between md:py-[10px] w-full items-center gap-4 md:gap-0">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-semibold text-background">
                {serie.first_air_date?.slice(0, 4)}
              </span>
            </div>
            <div className="text-center hidden md:block">
              <div className="text-background text-sm">
                {serie.genres?.map((genre) => genre.name).join(", ")}
              </div>
            </div>
            <div className="text-center">
              <div>
                <h2 className="text-background text-sm sm:text-base md:text-lg">
                  {t("detail.seasons").charAt(0).toUpperCase() + t("detail.seasons").slice(1).toLowerCase()}: <span>{serie.number_of_seasons}</span>
                </h2>
              </div>
              <div className="">
                <h2 className="text-background text-sm sm:text-base md:text-lg">
                  {t("detail.episodes").charAt(0).toUpperCase() + t("detail.episodes").slice(1).toLowerCase()}: <span>{serie.number_of_episodes}</span>
                </h2>
              </div>
            </div>
            <div>
              <h2 className="text-warning text-xl sm:text-2xl font-semibold">
                {parseFloat(serie.vote_average.toFixed(2))}
              </h2>
            </div>
            <div className="flex-1 sm:flex-initial min-w-0">
              <button
                onClick={handleDetailsClick}
                className="w-full text-xs sm:text-sm md:text-base lg:text-lg hover:bg-background hover:text-primary px-2 sm:px-4 md:px-6 lg:px-8 py-2 text-background font-semibold truncate"
              >
                {t("home.view_details")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    return (
      prevProps.serie.id === nextProps.serie.id &&
      prevProps.isLoadingToFavorite === nextProps.isLoadingToFavorite &&
      prevProps.seriesAdded.includes(
        prevProps.serie.id ? Number(prevProps.serie.id) : prevProps.serie.tv_id,
      ) ===
        nextProps.seriesAdded.includes(
          nextProps.serie.id ? Number(nextProps.serie.id) : nextProps.serie.tv_id,
        )
    );
  },
);

SerieCard.displayName = "SerieCard";

export default SerieCard;
