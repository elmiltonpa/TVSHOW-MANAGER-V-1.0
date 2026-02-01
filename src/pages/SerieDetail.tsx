import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SectionSeason from "../components/seasons/SectionSeason";
import Spinner from "../components/common/Spinner";
import CardDetail from "../components/detail/CardDetail";
import api from "../api/tmdb";
import serieService from "../services/series";
import getUser from "../services/user";
import { Serie, Season } from "../types";
import { useAuth } from "../context/AuthContext";

const SerieDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [serieWatched, setSerieWatched] = useState(false);
  const [serieAdded, setSerieAdded] = useState(false);
  const [serie, setSerie] = useState<Serie | null>(null);
  const [seasons, setSeasons] = useState<Season[] | null>(null);
  const [seasonwatching, setSeasonsWatching] = useState<boolean[][] | null>(
    null,
  );

  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const request = await api.searchTvShowById(id);
        const fetchSeasons = Array.from(
          { length: request.number_of_seasons || 0 },
          (_, i) => api.searchTvSeasonById(id, i + 1),
        );
        const seasonsData = await Promise.all(fetchSeasons);

        setSerie(request);
        setSeasons(seasonsData);

        if (user) {
          setIsLoadingUserData(true);
          try {
            const User = await getUser(user.username);
            if (User && User.id) {
              const seriesResponse = await serieService.getSeriesByUserId(User.id);
              const Series = Array.isArray(seriesResponse) ? seriesResponse : [];

              const serieSeasonsExist = Series.find(
                (serie) => serie.tv_id == Number(request.tv_id || request.id),
              );

              const isFavorite = Series.some(
                (serie) =>
                  serie.tv_id == Number(request.tv_id || request.id) &&
                  serie.favorite == true,
              );
              const isWatched = Series.some(
                (serie) =>
                  serie.tv_id == Number(request.tv_id || request.id) &&
                  serie.watched == true,
              );

              let watchingData: boolean[][] | null = null;
              if (serieSeasonsExist && Array.isArray(serieSeasonsExist.watching)) {
                watchingData = serieSeasonsExist.watching;
              }

              setSerieAdded(isFavorite);
              setSerieWatched(isWatched);
              setSeasonsWatching(watchingData);
            }
          } catch (error) {
            console.error("Error fetching user series details:", error);
          }
          setIsLoadingUserData(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching serie details:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  if (isLoading || isLoadingUserData) {
    return (
      <div className="h-screen flex justify-center dark:bg-gris6 dark:text-blancoblanco items-center pb-56 bg-blancoblanco text-3xl font-bold">
        <Spinner />
      </div>
    );
  }

  if (!serie) return null;

  return (
    <div className="bg-blancoblanco dark:bg-gris6 pb-10">
      <CardDetail
        serie={serie}
        serieAdded={serieAdded}
        setSerieAdded={setSerieAdded}
        serieWatched={serieWatched}
        setSerieWatched={setSerieWatched}
      />
      <div className="flex justify-center items-center w-full px-3 sm:px-0">
        <div className="w-full sm:w-[90%] lg:w-[75%]">
          <div className="flex flex-col gap-4 w-full">
            {seasons ? (
              seasons.map((season) => (
                <div key={season.id} className="bg-red-300 flex flex-col">
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
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerieDetail;