import { useParams } from "react-router-dom";
import SectionSeason from "../components/seasons/SectionSeason";
import api from "../api/tmdb";
import Spinner from "../components/common/Spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";
import { Serie, Season } from "../types";
import { useAuth } from "../context/AuthContext";

const ProfileSerieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [seasonwatching, setSeasonsWatching] = useState<boolean[][] | null>(
    null,
  );
  const [serie, setSerie] = useState<Serie | null>(null);
  const [lastEpisode, setLastEpisode] = useState<{
    season: number;
    capAux: number;
  } | null>(null);
  const [seasons, setSeasons] = useState<Season[] | null>(null);

  const [porcentajeSerie, setPorcentajeSerie] = useState(0);

  const navigate = useNavigate();
  const { user } = useAuth();

  const getLastEpisode = (seasons: boolean[][]) => {
    const arrAux = seasons.map((elem) => elem.lastIndexOf(true));
    const arrAuxReverse = [...arrAux].reverse();
    const arrAux2Index = arrAuxReverse.findIndex((elem) => elem != -1);

    if (arrAux2Index === -1) return { season: undefined, capAux: undefined };

    const season = arrAux.length - arrAux2Index;
    const realIndex = arrAux.length - 1 - arrAux2Index;
    const capAux = arrAux[realIndex];

    return { season, capAux };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const Serie = await api.searchTvShowById(id);
      setSerie(Serie);
      const fetchSeasons = Array.from(
        { length: Serie.number_of_seasons || 0 },
        (_, i) => api.searchTvSeasonById(id, i + 1),
      );
      const seasons = await Promise.all(fetchSeasons);

      if (user) {
        const User = await getUser(user.username);
        const Series = await serieService.getSeriesByUserId(User.id!);
        const serieInfo = Series.find((serie) => serie.tv_id == Number(id));
        if (
          serieInfo &&
          serieInfo.watching &&
          Array.isArray(serieInfo.watching)
        ) {
          const infoWatching = serieInfo.watching as boolean[][];
          setSeasonsWatching(infoWatching);
          const { season, capAux } = getLastEpisode(infoWatching);

          if (season != undefined && capAux != undefined) {
            setLastEpisode({ season, capAux: capAux + 1 });
          }

          const totalEpisodes = infoWatching
            .map((elem) => elem.length)
            .reduce((a, b) => a + b, 0);

          const totalEpisodesWatched = infoWatching
            .map((elem) => {
              const subTotal =
                elem.length - elem.filter((ep) => ep === false).length;
              return subTotal;
            })
            .reduce((a, b) => a + b, 0);

          if (totalEpisodes > 0) {
            const porcentaje = (totalEpisodesWatched / totalEpisodes) * 100;
            setPorcentajeSerie(porcentaje);
          }
        } else {
          setSerie(null);
        }
      }
      setSeasons(seasons);
      setIsLoading(false);
    };
    fetchData();
  }, [id, navigate, user]);

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
    <div className="flex flex-col gap-4 w-full dark:bg-gris6 items-center px-3 sm:px-0 pb-10">
      <div className="min-h-[30vh] sm:h-[50vh] flex flex-col justify-center items-center py-6">
        <h1 className="flex items-center dark:text-grisclaro justify-center text-2xl sm:text-3xl font-semibold py-2 text-center px-4">
          {serie.name}
        </h1>
        <div className="text-2xl sm:text-3xl flex dark:text-grisclaro justify-center items-center">
          {porcentajeSerie.toFixed(2)}%
        </div>
        {lastEpisode ? (
          <div className="text-lg sm:text-xl dark:text-grisclaro text-center">
            Ultimo capitulo {lastEpisode.season}X{lastEpisode.capAux}
          </div>
        ) : (
          <div className="text-lg sm:text-xl dark:text-grisclaro text-center">
            No has visto ningun capitulo
          </div>
        )}
      </div>
      <div className="flex flex-col w-full sm:w-[90%] md:w-[80%] lg:w-[70%] gap-2 justify-center items-center">
        {seasons ? (
          seasons.map((season) => (
            <div key={season.id} className="bg-red-300 w-full flex flex-col">
              <div className="bg-purpuraoscuro h-full flex flex-col gap justify-center items-center">
                <SectionSeason
                  seasonwatching={seasonwatching}
                  season={season.season_number}
                  episodes={season.episodes}
                  serieId={id!}
                  infoOfSeason={seasons}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="dark:text-grisclaro">Loading...</div>
        )}
      </div>
    </div>
  );
};
export default ProfileSerieDetail;
