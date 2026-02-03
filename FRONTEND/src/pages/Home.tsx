import { useEffect, useRef, useState } from "react";
import api from "../api/tmdb";
import SearchBar from "../components/home/SearchBar";
import SerieCard from "../components/home/SerieCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";
import Spinner from "../components/common/Spinner";
import { Serie } from "../types";
import { useAuth } from "../context/AuthContext";

const filterSeries = (series: Serie[]) => {
  return series.filter(
    (serie) => serie.overview !== "" && serie.poster_path !== null,
  );
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [serie, setSerie] = useState<Serie[] | null>(null);
  const [seriesAdded, setSeriesAdded] = useState<number[]>([]);
  const [isLoadingToFavorite, setIsLoadingToFavorite] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { user } = useAuth();

  const searchRef = useRef<NodeJS.Timeout | null>(null);
  const isUpdatingPage = useRef(false);
  const totalPagesRef = useRef(0);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("s");
  const visor = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home - TvShowManager";
    setPage(1);
    setSerie(null);
  }, [search]);

  useEffect(() => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    let isMounted = true;

    searchRef.current = setTimeout(async () => {
      try {
        const isSearching = search !== null && search !== "";
        const response = isSearching
          ? await api.searchTvShow(search, page)
          : await api.popularTvShow(page);

        if (!isMounted) return;

        totalPagesRef.current = response.total_pages;

        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id!),
        );

        const data = await Promise.all(promesas);

        if (!isMounted) return;

        if (page === 1) {
          setSerie(filterSeries(data));
        } else {
          setSerie((prev) =>
            prev ? [...prev, ...filterSeries(data)] : filterSeries(data),
          );
          setIsFetchingMore(false);
        }

        if (page === totalPagesRef.current) {
          setIsFetchingMore(false);
        }
        isUpdatingPage.current = false;
      } catch (error) {
        console.error("Error fetching series:", error);
        isUpdatingPage.current = false;
        setIsFetchingMore(false);
      }
    }, 500);

    return () => {
      isMounted = false;
      if (searchRef.current) {
        clearTimeout(searchRef.current);
      }
    };
  }, [search, page]);

  useEffect(() => {
    if (search === "") {
      navigate("/home", { replace: true });
    }
  }, [search, navigate]);

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
      setIsVisible(entry.isIntersecting);
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
    if (isVisible && !isUpdatingPage.current && page < totalPagesRef.current) {
      setPage((prevPage) => prevPage + 1);
      isUpdatingPage.current = true;
      setIsFetchingMore(true);
    }
  }, [isVisible, page]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const User = await getUser(user.username);
          const seriesData = await serieService.getSeriesByUserId(User.id!);
          const series = Array.isArray(seriesData) ? seriesData : [];
          const ids = series
            .filter((serie) => serie.favorite === true)
            .map((serie) => Number(serie.tv_id));
          setSeriesAdded(ids);
        } catch (error) {
          console.error("Error fetching user series:", error);
        }
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
        serie && serie.length === 1 ? "h-screen" : ""
      } bg-white dark:bg-background-dark px-3 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-2`}
    >
      <div className="">
        <SearchBar setSerie={setSerie} />
        <div className="conteiner">
          {serie ? (
            serie.length === 0 ? (
              <div className="h-screen text-foreground dark:text-white text-xl sm:text-2xl md:text-3xl flex justify-center items-start pt-10">
                No se encontraron series :(
              </div>
            ) : (
              <div>
                {serie.map((serieItem, index) => (
                  <div
                    ref={index === serie.length - 1 ? visor : null}
                    key={serieItem.id}
                    className="shadow-home dark:shadow-home dark:shadow-[#090909] bg-background my-4"
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
                  <div className="text-foreground dark:text-white text-3xl flex justify-center pb-6">
                    <Spinner />
                  </div>
                ) : null}
              </div>
            )
          ) : (
            <div className="h-screen text-foreground dark:text-white text-3xl flex justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
