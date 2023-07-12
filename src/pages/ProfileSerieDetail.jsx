import { useParams } from "react-router-dom";
import SectionSeason from "../components/seasons/SectionSeason";
import api from "../api/service";
import Spinner from "../components/common/Spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";

const ProfileSerieDetail = ({ seasonwatching }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [serie, setSerie] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [porcentajeSerie, setPorcentajeSerie] = useState(0);

  const navigate = useNavigate();
  //CUANTOS CAPS VOY VIENDO
  //POCENTAJE DE LA SERIE QUE VOY VIENDO

  //SI LA SERIE ESTA COMPLETA O NO
  //SI LA TEMPORADA ESTA COMPLETA O NO
  //SI EL CAPITULO ESTA COMPLETO O NO

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

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="h-[50vh]">
        <h1 className="flex items-center justify-center text-3xl font-semibold py-2">
          {serie.name}
        </h1>
        <div className="text-3xl">{porcentajeSerie.toFixed(2)}</div>
      </div>
      <div>
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
  );
};
export default ProfileSerieDetail;
