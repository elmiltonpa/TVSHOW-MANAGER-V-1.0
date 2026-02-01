import { useNavigate } from "react-router-dom";
import useSeries from "../../utils/useSeries";
import { Serie } from "../../types";

const BASE_URL = "https://image.tmdb.org/t/p/w500/";

interface SerieCardProps {
  serie: Serie;
  setSeriesAdded: React.Dispatch<React.SetStateAction<number[]>>;
  seriesAdded: number[];
  isLoadingToFavorite: boolean;
  setIsLoadingToFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}

const SerieCard = ({
  serie,
  setSeriesAdded,
  seriesAdded,
  isLoadingToFavorite,
  setIsLoadingToFavorite,
}: SerieCardProps) => {
  const navigate = useNavigate();
  const { handleSubmit } = useSeries();

  // El ID de TMDB puede venir como 'id' (API directa) o 'tv_id' (nuestra BD)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tmdbId = (serie as any).id || serie.tv_id;

  return (
    <div className="flex flex-col md:flex-row my-3 w-full bg-blanco dark:bg-gris5">
      <div className="md:w-[78%] w-full md:border-r-4 border-grisoscuro dark:border-gris6">
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
              <h1 className="text-xl sm:text-2xl md:text-3xl dark:text-textogris font-black font-lato text-center">
                {serie.name}
              </h1>
              <p className="text-sm sm:text-base overflow-hidden line-clamp-[7] dark:text-textogris font-overview text-center">
                {serie.overview}
              </p>
            </div>
            <div className="items-center border-t-2 dark:border-gris6 w-full flex justify-center mt-3 pt-2">
              {seriesAdded.includes(tmdbId) ? (
                <button
                  disabled={isLoadingToFavorite}
                  onClick={(e) =>
                    handleSubmit(
                      e,
                      tmdbId,
                      setSeriesAdded,
                      seriesAdded,
                      setIsLoadingToFavorite
                    )
                  }
                  className={`${
                    isLoadingToFavorite
                      ? "cursor-not-allowed text-amarillo3 dark:text-twitch"
                      : "hover:bg-purpuraoscuro dark:text-twitch dark:hover:bg-blancoblanco hover:text-blanco text-amarillo3"
                  } text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-10 py-2 font-semibold`}
                >
                  QUITAR DE FAVORITOS
                </button>
              ) : (
                <button
                  disabled={isLoadingToFavorite}
                  onClick={(e) =>
                    handleSubmit(
                      e,
                      tmdbId,
                      setSeriesAdded,
                      seriesAdded,
                      setIsLoadingToFavorite
                    )
                  }
                  className={`${
                    isLoadingToFavorite
                      ? "cursor-not-allowed dark:text-amarillo text-purpuraoscuro"
                      : "hover:bg-purpuraoscuro dark:text-amarillo dark:hover:bg-blancoblanco dark:hover:text-purpuraoscuro hover:text-blanco text-purpuraoscuro"
                  } text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-10 py-2 font-semibold`}
                >
                  AGREGAR A FAVORITOS
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[22%] w-full bg-purpuraoscuro py-3 px-5">
        <div className="flex md:flex-col flex-row md:h-full justify-between md:justify-between md:py-[10px] w-full items-center gap-4 md:gap-0">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-semibold text-blanco">
              {serie.first_air_date?.slice(0, 4)}
            </span>
          </div>
          <div className="text-center hidden md:block">
            <div className="text-blanco text-sm">
              {serie.genres?.map((genre) => genre.name).join(", ")}
            </div>
          </div>
          <div className="text-center">
            <div>
              <h2 className="text-blanco text-sm sm:text-base md:text-lg">
                Seasons: <span>{serie.number_of_seasons}</span>
              </h2>
            </div>
            <div className="">
              <h2 className="text-blanco text-sm sm:text-base md:text-lg">
                Episodes: <span>{serie.number_of_episodes}</span>
              </h2>
            </div>
          </div>
          <div>
            <h2 className="text-amarillo text-xl sm:text-2xl font-semibold">
              {parseFloat(serie.vote_average.toFixed(2))}
            </h2>
          </div>
          <div className="">
            <button
              onClick={() => navigate(`/home/${tmdbId}`)}
              className="text-sm sm:text-base md:text-lg hover:bg-blanco hover:text-purpuraoscuro px-4 sm:px-6 md:px-10 py-2 text-blanco font-semibold whitespace-nowrap"
            >
              VER DETALLES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerieCard;