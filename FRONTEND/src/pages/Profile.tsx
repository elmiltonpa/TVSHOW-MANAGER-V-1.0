import { useParams } from "react-router-dom";
import getUser from "../services/user";
import seriesService from "../services/series";
import { useEffect, useState } from "react";
import { FavSeries } from "../components/profile/FavSeries";
import Watched from "../components/profile/Watched";
import Spinner from "../components/common/Spinner";
import InfoProfile from "../components/profile/InfoProfile";
import { Serie } from "../types";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [seriesFav, setSeriesFav] = useState<Serie[] | null>(null);
  const [seriesWatched, setSeriesWatched] = useState<Serie[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { username } = useParams<{ username: string }>();

  const { user: loggedUser } = useAuth();

  useEffect(() => {
    document.title = `${username} - TvShowManager`;
  }, [username]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) return;
        const User = await getUser(username);
        const Series = await seriesService.getSeriesByUserId(User.id!);

        const FavSeries = Series.filter((serie) => serie.favorite == true);
        const WatchedSeries = Series.filter((serie) => serie.watched == true);

        setSeriesFav(FavSeries);
        setSeriesWatched(WatchedSeries);
      } catch (error) {
        console.error("Error cargando perfil", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (loggedUser) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [username, loggedUser]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center dark:bg-background-dark dark:text-white bg-white text-foreground text-3xl py-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="">
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-[25%] order-2 lg:order-1">
          {seriesFav && username && (
            <FavSeries
              seriesFav={seriesFav}
              setSeriesFav={setSeriesFav}
              username={username}
            />
          )}
        </div>
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          {username && <InfoProfile username={username} />}
        </div>
        <div className="w-full lg:w-[25%] bg-white order-3">
          {seriesWatched && username && (
            <Watched seriesWatched={seriesWatched} username={username} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
