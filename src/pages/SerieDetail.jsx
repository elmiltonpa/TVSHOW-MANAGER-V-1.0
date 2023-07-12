/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SectionSeason from "../components/seasons/SectionSeason";
import Spinner from "../components/common/Spinner";
import CardDetail from "../components/detail/CardDetail";
import api from "../api/service";
import serieService from "../services/series";
import getUser from "../services/user";

const SerieDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [serieWatched, setSerieWatched] = useState(false);
  const [serieAdded, setSerieAdded] = useState(false);
  const [serie, setSerie] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [seasonwatching, setSeasonsWatching] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const session = JSON.parse(window.localStorage.getItem("session"));
      const request = await api.searchTvShowById(id);
      const fetchSeasons = Array.from(
        { length: request.number_of_seasons },
        (_, i) => api.searchTvSeasonById(id, i + 1)
      );
      const seasons = await Promise.all(fetchSeasons);
      setSeasons(seasons);
      if (session) {
        const { username } = session;
        const User = await getUser(username);
        const Series = await serieService.getSeriesByUserId(User.id);

        const serieSeasonsExist = Series.find(
          (serie) => serie.tv_id == request.id
        ); //ARRAY DE TEMPORADAS WATHCING

        const serieIsFavorite = Series.some(
          (serie) => serie.tv_id == request.id && serie.favorite == true
        );
        const serieIsWatched = Series.some(
          (serie) => serie.tv_id == request.id && serie.watched == true
        );

        if (serieIsFavorite) {
          setSerieAdded(true);
        }
        if (serieIsWatched) {
          setSerieWatched(true);
        }
        if (serieSeasonsExist) {
          const arrayWatching = serieSeasonsExist.watching;

          setSeasonsWatching(arrayWatching);
        }
      }
      setSerie(request);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center dark:bg-gris6 dark:text-blancoblanco items-center pb-56 bg-blancoblanco text-3xl font-bold">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" bg-blancoblanco dark:bg-gris6 pb-10">
      <CardDetail
        serie={serie}
        serieAdded={serieAdded}
        setSerieAdded={setSerieAdded}
        serieWatched={serieWatched}
        setSerieWatched={setSerieWatched}
      />
      <div className="flex justify-center items-center w-full">
        <div className="w-[75%] ">
          <div className="flex flex-col gap-4 w-full">
            {seasons ? (
              seasons.map((season) => (
                <div key={season.id} className="bg-red-300 flex flex-col">
                  <div className="bg-purpuraoscuro h-full flex flex-col gap justify-center items-center">
                    <SectionSeason
                      seasonwatching={seasonwatching}
                      season={season.season_number}
                      episodes={season.episodes}
                      serieId={id}
                      infoOfSeason={seasons}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerieDetail;
