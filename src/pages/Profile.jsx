import { useParams } from "react-router-dom";
import getUser from "../services/user";
import seriesService from "../services/series";
import { useEffect, useState } from "react";
import { FavSeries } from "../components/profile/FavSeries";
import Watched from "../components/profile/Watched";
import Spinner from "../components/common/Spinner";
import InfoProfile from "../components/profile/InfoProfile";

const Profile = () => {
  const [seriesFav, setSeriesFav] = useState(null);
  const [seriesWatched, setSeriesWatched] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    document.title = `${username} - TvShowManager`;
  }, [username]);

  useEffect(() => {
    const session = JSON.parse(window.localStorage.getItem("session"));

    const fetchData = async () => {
      const User = await getUser(username);
      const Series = await seriesService.getSeriesByUserId(User.id);
      console.log(Series);
      const FavSeries = Series.filter((serie) => serie.favorite == true);
      const WatchedSeries = Series.filter((serie) => serie.watched == true);

      setSeriesFav(FavSeries);
      setSeriesWatched(WatchedSeries);

      setIsLoading(false);
    };
    if (session) {
      fetchData();
      setUser(true);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [username]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center dark:bg-gris6 dark:text-blancoblanco bg-blancoblanco text-negro text-3xl py-16">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="">
      {user ? (
        <div className="min-h-screen flex flex-col lg:flex-row">
          <div className="w-full lg:w-[25%] order-2 lg:order-1">
            <FavSeries
              seriesFav={seriesFav}
              setSeriesFav={setSeriesFav}
              username={username}
            />
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <InfoProfile username={username} />
          </div>
          <div className="w-full lg:w-[25%] bg-blancoblanco order-3">
            <Watched seriesWatched={seriesWatched} username={username} />
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center dark:bg-gris6 bg-blancoblanco">
          <h1 className="text-2xl dark:text-grisclaro text-negro">NO ESTAS LOGUEADO</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
