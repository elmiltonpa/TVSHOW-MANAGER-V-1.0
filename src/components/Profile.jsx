import { useParams, Link } from "react-router-dom";
import getUser from "../services/user";
import series from "../services/series";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userSeries, setUserSeries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const User = await getUser(username);
      const Series = await series.getSeriesByUserId(User.id);

      setUserSeries(Series);
      setIsLoading(false);
    };
    fetchData();
  }, [username]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {userSeries ? (
        userSeries.map((series) => (
          <div key={series.tv_id}>
            <Link to={`/${username}/${series.tv_id}`}>
              <h2>{series.tv_title}</h2>
            </Link>
          </div>
        ))
      ) : (
        <div>NO HAY SERIES</div>
      )}
    </div>
  );
};

export default Profile;
