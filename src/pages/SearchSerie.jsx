import { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import api from "../api/service";
import SerieCard from "../components/SerieCard";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchSerie = ({ token, user }) => {
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
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(async () => {
      if (!search) {
        const response = await api.popularTvShow().then((res) => res);
        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id)
        );
        Promise.all(promesas).then((data) => {
          setSerie(Filtro(data));
        });
        navigate("/home");
        return;
      }

      const response = await api.searchTvShow(search).then((res) => res);

      const promesas = response.results.map((serie) =>
        api.searchTvShowById(serie.id)
      );

      Promise.all(promesas).then((data) => {
        setSerie(Filtro(data));
      });
    }, 1000);
  }, [search, navigate]);
  return (
    <div className="bg-negro px-32 py-2">
      <div className="">
        <div>
          <SearchBar setSerie={setSerie} />
        </div>
        {serie.length > 0 ? (
          serie.map((serie) => (
            <div className="flex-col gap-3 h-full bg-grisclaro" key={serie.id}>
              <SerieCard serie={serie} token={token} user={user} />
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

export default SearchSerie;
