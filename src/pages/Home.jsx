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
  const [isVisible, setIsVisible] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1000);
  const [serie, setSerie] = useState(null);
  const [seriesAdded, setSeriesAdded] = useState([]);
  const [isLoadingToFavorite, setIsLoadingToFavorite] = useState(false);

  const searchRef = useRef();
  const isUpdatingPage = useRef(false);

  const query = useQuery();
  const search = query.get("s");
  const visor = useRef(null);
  const navigate = useNavigate();

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
        const response = await api.popularTvShow(page).then((res) => res);
        setTotalPages(response.total_pages);
        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id)
        );
        if (page == 1) {
          Promise.all(promesas).then((data) => {
            setSerie(Filtro(data));
          });
        } else {
          Promise.all(promesas).then((data) => {
            setSerie((prev) => [...prev, ...Filtro(data)]);
          });
        }
      } else {
        const response = await api.searchTvShow(search).then((res) => res);

        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id)
        );

        Promise.all(promesas).then((data) => {
          setSerie(Filtro(data));
        });
      }

      isUpdatingPage.current = false;
    }, 1000);

    if (!search) {
      navigate("/home");
    }
  }, [search, navigate, page]);

  useEffect(() => {
    if (!serie) return;
    const Visor = visor.current;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const refObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
    }, options);
    if (Visor) {
      refObserver.observe(Visor);
    }

    return () => {
      if (Visor) {
        refObserver.unobserve(Visor);
      }
    };
  }, [serie]);

  useEffect(() => {
    console.log("aa");
    if (isVisible && !isUpdatingPage.current) {
      setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
      isUpdatingPage.current = true;
    }
  }, [isVisible, totalPages, isUpdatingPage]);

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
        <div className="conteiner">
          {serie ? (
            serie.length == 0 ? (
              <div className="h-screen text-blanco text-3xl flex justify-center">
                No se encontraron series :(
              </div>
            ) : (
              <div>
                {serie.map((serieItem, index) => (
                  <div
                    ref={index == serie.length - 1 ? visor : null}
                    key={serieItem.id}
                  >
                    <SerieCard
                      isLoadingToFavorite={isLoadingToFavorite}
                      setIsLoadingToFavorite={setIsLoadingToFavorite}
                      serie={serieItem}
                      seriesAdded={seriesAdded}
                      setSeriesAdded={setSeriesAdded}
                    />
                  </div>
                ))}
                {isUpdatingPage ? (
                  <div className=" text-blanco text-3xl flex justify-center">
                    <Spinner />
                  </div>
                ) : null}
              </div>
            )
          ) : (
            <div className="h-screen text-blanco text-3xl flex justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
