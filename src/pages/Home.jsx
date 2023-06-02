import { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import api from "../api/service";
import SerieCard from "../components/SerieCard";
import getUser from "../services/user";
import serieService from "../services/series";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = ({ token, user }) => {
  const [userSeries, setUserSeries] = useState([]);
  const [serie, setSerie] = useState([]);

  const searchRef = useRef();
  const navigate = useNavigate();

  const query = useQuery();
  const search = query.get("search");

  const Filtro = (series) => {
    const newSeries = series.filter(
      (serie) =>
        serie.overview.length < 650 &&
        serie.overview !== "" &&
        serie.poster_path !== null
    );

    return newSeries;
  };

  useEffect(() => {
    const fetchData = async () => {
      const User = await getUser(user.username);
      const series = await serieService.getSeriesByUserId(User.id);
      setUserSeries(series);
    };
    if (user) {
      fetchData();
    }

    document.title = "Home - TvShowManager";
  }, [user]);

  useEffect(() => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(async () => {
      if (!search) {
        const response = await api.popularTvShow();

        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id)
        );
        Promise.all(promesas).then((data) => {
          setSerie(Filtro(data));
        });
      } else {
        const response = await api.searchTvShow(search).then((res) => res);

        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id)
        );

        Promise.all(promesas).then((data) => {
          setSerie(Filtro(data));
        });
      }
    }, 1000);

    if (!search) {
      navigate("/home");
    }
  }, [search, navigate]);

  return (
    <div className="bg-negro px-32 py-2">
      <div className="">
        <div>
          <SearchBar setSerie={setSerie} />
        </div>
        {serie.length > 0 ? (
          serie.map((serie, index) => (
            <div className="flex-col gap-3 h-full bg-grisclaro" key={index}>
              <SerieCard
                serie={serie}
                token={token}
                user={user}
                userSeries={userSeries}
                setUserSeries={setUserSeries}
              />
            </div>
          ))
        ) : (
          <div className="h-screen text-blanco text-3xl flex justify-center">
            Cargando...
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
