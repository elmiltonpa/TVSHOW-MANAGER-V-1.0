import { useEffect, useRef, useState } from "react";
import api from "../api/service";
import SearchBar from "../components/home/SearchBar";
import SerieCard from "../components/home/SerieCard";
import { useLocation, useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";
import Spinner from "../components/shared/Spinner";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = ({ user }) => {
  const [serie, setSerie] = useState(null);
  const [seriesAdded, setSeriesAdded] = useState([]);
  const [isLoadingToFavorite, setIsLoadingToFavorite] = useState(false);

  const searchRef = useRef();

  const navigate = useNavigate();

  const query = useQuery();
  const search = query.get("s");

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
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(async () => {
      if (search === null || search === "") {
        const response = await api.popularTvShow().then((res) => res);
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

  useEffect(() => {
    const fetchData = async () => {
      const User = await getUser(user.username);
      const series = await serieService.getSeriesByUserId(User.id);
      const ids = series
        .filter((serie) => serie.favorite == true)
        .map((serie) => parseInt(serie.tv_id));
      setSeriesAdded(ids);
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    document.title = "Home - TvShowManager";
  }, []);

  return (
    <div
      className={`${
        serie && serie.length == 1 ? "h-screen" : ""
      } bg-negro px-32 py-2`}
    >
      <div className="">
        <SearchBar setSerie={setSerie} />
        {serie ? (
          serie.length == 0 ? (
            <div className="h-screen text-blanco text-3xl flex justify-center">
              No se encontraron series :(
            </div>
          ) : (
            serie.map((serieItem) => (
              <div key={serieItem.id}>
                <SerieCard
                  isLoadingToFavorite={isLoadingToFavorite}
                  setIsLoadingToFavorite={setIsLoadingToFavorite}
                  serie={serieItem}
                  seriesAdded={seriesAdded}
                  setSeriesAdded={setSeriesAdded}
                />
              </div>
            ))
          )
        ) : (
          <div className="h-screen text-blanco text-3xl flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
