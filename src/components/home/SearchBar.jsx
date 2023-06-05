import { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/service";

const SearchBar = ({ setSerie }) => {
  const [text, setText] = useState("");
  const searchRef = useRef();
  const [searchParams] = useSearchParams();
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
    const searchValue = searchParams.get("s") || "";
    setText(searchValue);
  }, [searchParams]);

  const onChangeSearch = (event) => {
    navigate("/home?s=" + event.target.value, { replace: true });
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(async () => {
      if (event.target.value == "") {
        const response = await api.popularTvShow().then((res) => res);
        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id)
        );
        Promise.all(promesas).then((data) => {
          setSerie(Filtro(data));
        });

        return;
      }

      const response = await api
        .searchTvShow(event.target.value)
        .then((res) => res);

      const promesas = response.results.map((serie) =>
        api.searchTvShowById(serie.id)
      );

      Promise.all(promesas).then((data) => {
        setSerie(Filtro(data));
      });
    }, 1000);
  };
  const clearInput = () => {
    setText("");
    onChangeSearch({ target: { value: "" } });
  };

  return (
    <div className="w-full bg-negro h-16 flex justify-center items-center">
      <div className="relative w-[30%]">
        <input
          className="bg-blanco w-full rounded-lg px-3 h-10 text-white text-xl"
          value={text}
          type="text"
          placeholder="Buscar..."
          onChange={(e) => {
            setText(e.target.value);
            onChangeSearch(e);
          }}
        />

        {text && (
          <button
            className="absolute right-2 text-2xl text-rojo font-bold top-1/2 transform -translate-y-1/2"
            onClick={clearInput}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
