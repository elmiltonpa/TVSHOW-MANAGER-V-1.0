/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeasonProfile from "./SeasonsProfile";
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
  // const [seasonWatched, setSeasonWatched] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const session = JSON.parse(window.localStorage.getItem("session"));
      const request = await api.searchTvShowById(id);
      if (session) {
        const { username } = session;
        const User = await getUser(username);
        const Series = await serieService.getSeriesByUserId(User.id);

        const serieSeasons = Series.find(
          (serie) => serie.tv_id == request.id
        ).watching;

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
        if (serieSeasons) {
          setSeasons(serieSeasons);
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
          <SeasonProfile seasonwatching={seasons} />
        </div>
      </div>
    </div>
  );
};

export default SerieDetail;
