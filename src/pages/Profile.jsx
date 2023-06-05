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
    <div className="">
      {user ? (
        <div className="h-full">
          <div className="bg-negro flex justify-center items-center h-[50px]">
            <h1 className="text-blancoblanco text-4xl">{username}</h1>
          </div>
          <div className="h-[85vh] flex">
            <div className="h-full w-[20%] bg-rosaclaro">
              {userSeries.length > 0 ? (
                userSeries.map((series) => (
                  <div className="bg-negroclaro" key={series.tv_id}>
                    <div className="">
                      <Link to={`/${username}/${series.tv_id}`}>
                        <h2>{series.tv_title}</h2>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" w-full">NO HAY SERIES EN TUS FAVORITOS</div>
              )}
            </div>
            <div>Series vistas</div>
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
