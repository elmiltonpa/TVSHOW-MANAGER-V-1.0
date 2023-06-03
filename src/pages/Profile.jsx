import { useParams, Link } from "react-router-dom";
import getUser from "../services/user";
import series from "../services/series";
import { useEffect, useState } from "react";

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
      const Series = await series.getSeriesByUserId(User.id);

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
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {user ? (
        userSeries ? (
          userSeries.map((series) => (
            <div key={series.tv_id}>
              <Link to={`/${username}/${series.tv_id}`}>
                <h2>{series.tv_title}</h2>
              </Link>
            </div>
          ))
        ) : (
          <div>NO HAY SERIES</div>
        )
      ) : (
        <div>
          <h1>NO ESTAS LOGUEADO</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
