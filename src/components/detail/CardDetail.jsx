/* eslint-disable indent */
import useSeries from "../../utils/useSeries";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";

//CORAZON IoIosHeart
//CORAZON TACHADO IoMdHeartDislike
//OJO AiFillEye

const CardDetail = ({
  serie,
  serieAdded,
  setSerieAdded,
  serieWatched,
  setSerieWatched,
}) => {
  const IMG = "https://image.tmdb.org/t/p/w500/";

  const { handleSubmitFromSerieDetail, handleWatched } = useSeries();
  return (
    <div className=" flex justify-center pb-10 pt-10">
      <div className="w-[75%] shadow-home dark:bg-gris7 dark:shadow-[#090909] bg-blanco p-5 rounded-md gap-3">
        <div className="flex w-full gap-4">
          <div className="w-[25%] flex flex-col justify-center items-center h-full">
            <img
              className="h-full rounded-lg"
              src={IMG + serie.poster_path}
              alt=""
            />
            <div className="flex flex-col justify-center py-4 items-center">
              <h1 className="text-xl font-semibold dark:text-azultwitter text-purpuraoscuro">
                TEMPORADAS: {serie.number_of_seasons}
              </h1>
              <h1 className="text-xl font-semibold dark:text-azultwitter text-purpuraoscuro">
                EPISODIOS: {serie.number_of_episodes}
              </h1>
            </div>
          </div>
          <div className="flex w-[75%] flex-col justify-between">
            <div className="">
              <div className="flex justify-between pr-20">
                <div className="s">
                  <div className="flex gap-1 ">
                    <h1 className="text-negro dark:text-grisclaro text-4xl pb-3 font-bold">
                      {serie.name}
                    </h1>
                  </div>
                  <h1 className="pt-1 dark:text-grisclaro  font-mono">
                    {serie.tagline ? `"${serie.tagline}"` : null}
                  </h1>
                  <div className="flex py-2">
                    <h3 className="text-purpuraoscuro dark:text-azultwitter text-xl font-black font-lato">
                      {serie.first_air_date.slice(0, 4)}
                    </h3>
                    <span
                      className={`px-5  font-bold ${
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
                <div className="cora pt-5">
                  <button
                    title={`${
                      serieAdded ? "Quitar de favoritos" : "Añadir a favoritos"
                    }`}
                    className={`${
                      serieAdded ? "text-rojocorazon" : "text-negro"
                    }`}
                    onClick={(e) =>
                      handleSubmitFromSerieDetail(e, serie.id, setSerieAdded)
                    }
                  >
                    <IoIosHeart size={60} color="" />
                  </button>
                </div>
              </div>
              <p className="py-2 border-t-2 dark:text-grisclaro  font-overview font-medium text-lg">
                {serie.overview}
              </p>
            </div>
            <div className="flex justify-evenly gap-16 pl-[5%] py-4">
              <div className="items-center pl-4 flex flex-col justify-center">
                <h1 className="text-lg dark:text-grisclaro  text-center font-normal">
                  {serie.created_by.length > 0
                    ? `Created by: ${serie.created_by[0].name}`
                    : null}
                </h1>
                <h1 className="text-base dark:text-grisclaro  font-medium">
                  {serie.genres.map((genre) => genre.name).join(", ")}
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-purpuraoscuro dark:text-azultwitter text-2xl font-black">
                  {parseFloat(serie.vote_average.toFixed(1))}/10
                </h2>
                <span className="font-medium dark:text-grisclaro ">
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
              onClick={(e) => handleWatched(e, serie.id, setSerieWatched)}
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
