/* eslint-disable indent */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/service";
import serieService from "../services/series";
import useSeries from "../utils/useSeries";
import SerieProfile from "../components/profile/SeasonsProfile";
import getUser from "../services/user";
import Spinner from "../components/Spinner";

const IMG = "https://image.tmdb.org/t/p/w500/";

const SerieDetail = () => {
  const [serie, setSerie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serieAdded, setSerieAdded] = useState(false);

  const { handleSubmit2, handleDelete3 } = useSeries();

  const { id } = useParams();

  useEffect(() => {
    const session = JSON.parse(window.localStorage.getItem("session"));
    const { username } = session;
    const fetchData = async () => {
      const request = await api.searchTvShowById(id);
      const User = await getUser(username);
      const Series = await serieService.getSeriesByUserId(User.id);
      const serieIsAdded = Series.find((serie) => serie.tv_id == request.id);

      if (serieIsAdded) {
        setSerieAdded(true);
      }
      setSerie(request);
      setIsLoading(false);
    };
    if (session) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center pb-56 bg-blancoblanco text-3xl font-bold">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" bg-negro pb-10">
      <div className=" bg-neg flex justify-center pb-10 pt-10">
        <div className="w-[75%] bg-blanco p-5 rounded-md flex flex-col gap-3">
          <div className="flex gap-4">
            <img
              className="h-full rounded-lg"
              width={270}
              src={IMG + serie.poster_path}
              alt=""
            />

            <div className="">
              <div className="flex gap-1 ">
                <h1 className="text-negro text-4xl pb-3 font-bold">
                  {serie.name}
                </h1>
              </div>
              <h1 className="pt-1 font-mono">
                {serie.tagline ? `"${serie.tagline}"` : null}
              </h1>
              <div className="flex py-2">
                <h3 className="text-purpuraoscuro text-xl font-black font-lato">
                  {serie.first_air_date.slice(0, 4)}
                </h3>
                <span
                  className={`px-5 font-bold ${
                    serie.status == "Ended"
                      ? "text-rojo"
                      : `${
                          serie.status == "Returning Series"
                            ? "text-verde"
                            : `${
                                serie.status == "Canceled" ? "text-negro" : null
                              }`
                        }`
                  }`}
                >
                  {serie.status}
                </span>
              </div>
              <p className="py-2 border-t-2 font-overview font-medium text-lg">
                {serie.overview}
              </p>
            </div>
          </div>
          <div className="flex justify-evenly gap-44">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl font-semibold text-purpuraoscuro">
                TEMPORADAS: {serie.number_of_seasons}
              </h1>
              <h1 className="text-xl font-semibold text-purpuraoscuro">
                EPISODIOS: {serie.number_of_episodes}
              </h1>
            </div>
            <div className="items-center pl-4 flex flex-col justify-center">
              <h1 className="text-lg text-center font-normal">
                {serie.created_by.length > 0
                  ? `Created by: ${serie.created_by[0].name}`
                  : null}
              </h1>
              <h1 className="text-base font-medium">
                {serie.genres.map((genre) => genre.name).join(", ")}
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-purpuraoscuro text-2xl font-black">
                {parseFloat(serie.vote_average.toFixed(1))}/10
              </h2>
              <span className="font-medium">
                {serie.vote_count} votos de usuarios
              </span>
            </div>
          </div>
          <div className="w-full border-t-2 flex py-3 justify-center">
            {serieAdded ? (
              <button
                onClick={(e) => handleDelete3(e, serie.id, setSerieAdded)}
                className="text-lg hover:bg-purpuraoscuro hover:text-blanco px-10 font-semibold text-amarillo3"
              >
                QUITAR DE FAVORITOS
              </button>
            ) : (
              <button
                onClick={(e) => handleSubmit2(e, serie.id, setSerieAdded)}
                className="text-lg hover:bg-purpuraoscuro hover:text-blanco px-10 font-semibold text-purpuraoscuro"
              >
                AGREGAR A FAVORITOS
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="w-[75%] ">
          <SerieProfile />
        </div>
      </div>
    </div>
  );
};

export default SerieDetail;
