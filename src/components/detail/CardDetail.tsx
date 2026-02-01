import useSeries from "../../utils/useSeries";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";
import { Serie } from "../../types";

interface CardDetailProps {
  serie: Serie;
  serieAdded: boolean;
  setSerieAdded: React.Dispatch<React.SetStateAction<boolean>>;
  serieWatched: boolean;
  setSerieWatched: React.Dispatch<React.SetStateAction<boolean>>;
}

const IMG = "https://image.tmdb.org/t/p/w500/";

const CardDetail = ({
  serie,
  serieAdded,
  setSerieAdded,
  serieWatched,
  setSerieWatched,
}: CardDetailProps) => {

  const { handleSubmitFromSerieDetail, handleWatched } = useSeries();

  // Obtener el ID de forma segura (soporta objeto TMDB puro o nuestro objeto de BD)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tmdbId = (serie as any).id || serie.tv_id;

  return (
    <div className="flex justify-center pb-10 pt-6 sm:pt-10 px-3 sm:px-0">
      <div className="w-full sm:w-[90%] lg:w-[75%] shadow-home dark:bg-gris7 dark:shadow-[#090909] bg-blanco p-3 sm:p-5 rounded-md gap-3">
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="w-full md:w-[25%] flex flex-col justify-center items-center">
            {serie.poster_path && (
              <img
                className="w-full max-w-[300px] md:w-full h-auto rounded-lg"
                src={IMG + serie.poster_path}
                alt={serie.name || "Serie poster"}
              />
            )}
            <div className="flex flex-col justify-center py-4 items-center">
              <h1 className="text-lg sm:text-xl font-semibold dark:text-azultwitter text-purpuraoscuro">
                TEMPORADAS: {serie.number_of_seasons}
              </h1>
              <h1 className="text-lg sm:text-xl font-semibold dark:text-azultwitter text-purpuraoscuro">
                EPISODIOS: {serie.number_of_episodes}
              </h1>
            </div>
          </div>
          <div className="flex w-full md:w-[75%] flex-col justify-between">
            <div className="">
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex-1">
                  <div className="flex gap-1">
                    <h1 className="text-negro dark:text-grisclaro text-2xl sm:text-3xl md:text-4xl pb-3 font-bold">
                      {serie.name}
                    </h1>
                  </div>
                  <h1 className="pt-1 dark:text-grisclaro text-sm sm:text-base font-mono">
                    {serie.tagline ? `"${serie.tagline}"` : null}
                  </h1>
                  <div className="flex py-2 flex-wrap items-center">
                    <h3 className="text-purpuraoscuro dark:text-azultwitter text-lg sm:text-xl font-black font-lato">
                      {serie.first_air_date?.slice(0, 4)}
                    </h3>
                    <span
                      className={`px-3 sm:px-5 font-bold text-sm sm:text-base ${
                        serie.status == "Ended"
                          ? "text-rojo"
                          : `${
                            serie.status == "Returning Series"
                              ? "text-verde"
                              : `${
                                serie.status == "Canceled"
                                  ? "text-negro"
                                  : null
                              }`
                          }`
                      }`}
                    >
                      {serie.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center sm:justify-end items-start pt-2 sm:pt-5">
                  <button
                    title={`${
                      serieAdded ? "Quitar de favoritos" : "Añadir a favoritos"
                    }`}
                    className={`${
                      serieAdded ? "text-rojocorazon" : "text-negro dark:text-grisclaro"
                    }`}
                    onClick={(e) =>
                      handleSubmitFromSerieDetail(e, tmdbId, setSerieAdded)
                    }
                  >
                    <IoIosHeart size={50} className="sm:w-[60px] sm:h-[60px]" />
                  </button>
                </div>
              </div>
              <p className="py-2 border-t-2 dark:text-grisclaro font-overview font-medium text-sm sm:text-base md:text-lg">
                {serie.overview}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-evenly gap-4 sm:gap-8 md:gap-16 py-4">
              <div className="items-center flex flex-col justify-center">
                <h1 className="text-base sm:text-lg dark:text-grisclaro text-center font-normal">
                  {serie.created_by && serie.created_by.length > 0
                    ? `Created by: ${serie.created_by[0].name}`
                    : null}
                </h1>
                <h1 className="text-sm sm:text-base dark:text-grisclaro font-medium text-center">
                  {serie.genres?.map((genre) => genre.name).join(", ")}
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-purpuraoscuro dark:text-azultwitter text-xl sm:text-2xl font-black">
                  {parseFloat(serie.vote_average.toFixed(1))}/10
                </h2>
                <span className="font-medium dark:text-grisclaro text-sm sm:text-base">
                  {serie.vote_count} votos de usuarios
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-t-2 flex gap-10 pt-3 justify-center">
          <div>
            <button
              title={`${serieWatched ? "Quitar de vistos" : "Añadir a vistos"}`}
              onClick={(e) => handleWatched(e, tmdbId, setSerieWatched)}
              className="dark:text-grisclaro"
            >
              {serieWatched ? (
                <AiFillEyeInvisible size={40} />
              ) : (
                <AiFillEye size={40} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;