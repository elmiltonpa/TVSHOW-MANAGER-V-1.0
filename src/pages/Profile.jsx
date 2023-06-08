import { useParams } from "react-router-dom";
import getUser from "../services/user";
import seriesService from "../services/series";
import { useEffect, useState } from "react";
import { FavSeries } from "../components/profile/FavSeries";
import Watching from "../components/profile/Watching";
import Spinner from "../components/Spinner";

const Profile = () => {
  const [userSeries, setUserSeries] = useState(null);

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

      setUserSeries(Series);
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
      <div className="h-screen flex justify-center bg-negro text-blancoblanco text-3xl py-16">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="">
      {user ? (
        <div className="h-screen flex">
          <div className="w-[25%]">
            <FavSeries
              userSeries={userSeries}
              setUserSeries={setUserSeries}
              username={username}
            />
          </div>
          <div className="w-1/2 bg-purpura"></div>
          <div className="w-[25%] bg-blancoblanco">
            <Watching />
          </div>
        </div>
      ) : (
        <div>
          <h1>NO ESTAS LOGUEADO</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
