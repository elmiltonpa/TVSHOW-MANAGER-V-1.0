import { useEffect, useRef, useState } from "react";
import api from "../api/tmdb";
import SearchBar from "../components/home/SearchBar";
import SerieCard from "../components/home/SerieCard";
import { useLocation, useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";
import Spinner from "../components/common/Spinner";
import { Serie } from "../types";
import { useAuth } from "../context/AuthContext";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [serie, setSerie] = useState<Serie[] | null>(null);
  const [seriesAdded, setSeriesAdded] = useState<number[]>([]);
  const [isLoadingToFavorite, setIsLoadingToFavorite] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { user } = useAuth();

  const searchRef = useRef<NodeJS.Timeout | null>(null);
  const isUpdatingPage = useRef(false);

  const query = useQuery();
  const search = query.get("s");
  const visor = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const Filtro = (series: Serie[]) => {
    const newSeries = series.filter(
      (serie) => serie.overview !== "" && serie.poster_path !== null,
    );

    return newSeries;
  };

  useEffect(() => {
    document.title = "Home - TvShowManager";
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(async () => {
      if (search === null || search === "") {
        const response = await api.popularTvShow(page).then((res) => res);
        setTotalPages(response.total_pages);
        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id!),
        );
        if (page == 1) {
          Promise.all(promesas).then((data) => {
            setSerie(Filtro(data));
          });
        } else {
          Promise.all(promesas).then((data) => {
            setSerie((prev) =>
              prev ? [...prev, ...Filtro(data)] : Filtro(data),
            );
            setIsFetchingMore(false);
          });
        }
      } else {
        const response = await api
          .searchTvShow(search, page)
          .then((res) => res);

        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id!),
        );
        setTotalPages(response.total_pages);
        if (page == 1) {
          Promise.all(promesas).then((data) => {
            setSerie(Filtro(data));
          });
        } else {
          Promise.all(promesas).then((data) => {
            setSerie((prev) =>
              prev ? [...prev, ...Filtro(data)] : Filtro(data),
            );
            setIsFetchingMore(false);
          });
        }
      }
      if (page == totalPages) {
        setIsFetchingMore(false);
      }
      isUpdatingPage.current = false;
    }, 1000);

    if (!search) {
      navigate("/home");
    }
  }, [search, navigate, page, totalPages]);

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
    if (isVisible && !isUpdatingPage.current && page < totalPages) {
      setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
      isUpdatingPage.current = true;
      setIsFetchingMore(true);
    }
  }, [isVisible, totalPages, isUpdatingPage, page]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const User = await getUser(user.username);
        const series = await serieService.getSeriesByUserId(User.id!);
        const ids = series
          .filter((serie) => serie.favorite == true)
                      .map((serie) => Number(serie.tv_id));        setSeriesAdded(ids);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div
      style={{ msScrollbarBaseColor: "#202123" } as React.CSSProperties}
      className={`${
        serie && serie.length == 1 ? "h-screen" : ""
      } bg-blancoblanco dark:bg-gris6 px-3 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-2`}
    >
      <div className="">
        <SearchBar setSerie={setSerie} />
        <div className="conteiner">
          {serie ? (
            serie.length == 0 ? (
              <div className="h-screen text-negro dark:text-blancoblanco text-xl sm:text-2xl md:text-3xl flex justify-center items-start pt-10">
                No se encontraron series :(
              </div>
            ) : (
              <div>
                {serie.map((serieItem, index) => (
                  <div
                    ref={index == serie.length - 1 ? visor : null}
                    key={serieItem.id}
                    className="shadow-home dark:shadow-home dark:shadow-[#090909] bg-blanco my-4"
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
                {isFetchingMore ? (
                  <div className="text-negro dark:text-blancoblanco text-3xl flex justify-center pb-6">
                    <Spinner />
                  </div>
                ) : null}
              </div>
            )
          ) : (
            <div className="h-screen text-negro dark:text-blancoblanco text-3xl flex justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
