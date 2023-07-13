import { useParams } from "react-router-dom";
import SectionSeason from "../components/seasons/SectionSeason";
import api from "../api/service";
import Spinner from "../components/common/Spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";

const ProfileSerieDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [seasonwatching, setSeasonsWatching] = useState(null);
  const [serie, setSerie] = useState(null);
  const [lastEpisode, setLastEpisode] = useState(null);
  const [seasons, setSeasons] = useState([]);

  const [porcentajeSerie, setPorcentajeSerie] = useState(0);

  const navigate = useNavigate();

  const getLastEpisode = (seasons) => {
    const arrAux = seasons.map((elem) => elem.lastIndexOf(true));
    const arrAux2 = arrAux.reverse().findIndex((elem) => elem != -1);
    const season = arrAux.length - arrAux2;
    const capAux = arrAux[arrAux2];

    return { season, capAux };
  };

  useEffect(() => {
    const session = JSON.parse(window.localStorage.getItem("session"));
    if (!session) {
      navigate("/home");
    }

    const fetchData = async () => {
      const Serie = await api.searchTvShowById(id);
      setSerie(Serie);
      const fetchSeasons = Array.from(
        { length: Serie.number_of_seasons },
        (_, i) => api.searchTvSeasonById(id, i + 1)
      );
      const seasons = await Promise.all(fetchSeasons);

      if (session) {
        const { username } = session;
        const User = await getUser(username);
        const Series = await serieService.getSeriesByUserId(User.id);
        const serieInfo = Series.find((serie) => serie.tv_id === id);
        if (serieInfo) {
          const infoWatching = serieInfo.watching;
          setSeasonsWatching(infoWatching);
          const { season, capAux } = getLastEpisode(infoWatching);

          if (season != undefined && capAux != undefined) {
            setLastEpisode({ season, capAux: capAux + 1 });
          }

          const totalEpisodes = infoWatching
            .map((elem) => elem.length)
            .reduce((a, b) => a + b);

          const totalEpisodesWatched = infoWatching
            .map((elem) => {
              const subTotal =
                elem.length - elem.filter((ep) => ep === false).length;
              return subTotal;
            })
            .reduce((a, b) => a + b);

          const porcentaje = (totalEpisodesWatched / totalEpisodes) * 100;
          setPorcentajeSerie(porcentaje);
        } else {
          setSerie(null);
        }
      }
      setSeasons(seasons);
      setIsLoading(false);
    };
    fetchData();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center dark:bg-gris6 dark:text-blancoblanco items-center pb-56 bg-blancoblanco text-3xl font-bold">
        <Spinner />
      </div>
    );
  }

  if (!serie) {
    return (
      <div className="h-screen flex justify-center dark:bg-gris6 dark:text-blancoblanco items-center pb-56 bg-blancoblanco text-3xl font-bold">
        <div>No has visto esta serie</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 w-full dark:bg-gris6 items-center">
      <div className="h-[50vh] flex flex-col justify-">
        <h1 className="flex items-center dark:text-grisclaro justify-center text-3xl font-semibold py-2">
          {serie.name}
        </h1>
        <div className="text-3xl flex dark:text-grisclaro justify-center items-center">
          {porcentajeSerie.toFixed(2)}%
        </div>
        {lastEpisode ? (
          <div className="text-xl dark:text-grisclaro">
            Ulitmo capitulo {lastEpisode.season}X{lastEpisode.capAux}
          </div>
        ) : (
          <div className="text-xl dark:text-grisclaro">
            No has visto ningun capitulo
          </div>
        )}
      </div>
      <div className="flex flex-col w-[70%] gap-2 justify-center items-center">
        {seasons ? (
          seasons.map((season) => (
            <div key={season.id} className="bg-red-300 w-full flex flex-col">
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
  );
};
export default ProfileSerieDetail;
