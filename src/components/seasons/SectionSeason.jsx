import { useState, useEffect } from "react";
import useSeries from "../../utils/useSeries";
const IMG = "https://image.tmdb.org/t/p/w500";

const SectionSeason = ({
  season,
  episodes,
  serieId,
  seasonwatching,
  infoOfSeason,
}) => {
  const [IsOpen, setIsOpen] = useState(false);
  const [arrayWatching, setArrayWatching] = useState(seasonwatching); //ARRAY DE TEMPORADAS WATHCING
  const [seasonInfo, setSeasonInfo] = useState(null); //ARRAY DE LA TEMPORADA ACTUAL  //SIRVE PARA SABER SI EL CAPITULO ESTA VISTO O NO
  const [seasonIsFull, setSeasonIsFull] = useState(false); //SIRVE PARA SABER SI LA TEMPORADA ESTA VISTA O NO
  const { handleCapWatched, handleSeasonWatched } = useSeries();

  // console.log("arraywatching:", arrayWatching); //NULL SI NO ESTA LA SERIE EN LA BD
  // console.log("seasoninfo:", seasonInfo); //NULL SI NO ESTA LA SERIE EN LA BD
  // console.log("infoOfSeason:", infoOfSeason); //ARRAY DE LAS TEMPORADAS DE LA SERIE

  useEffect(() => {
    if (arrayWatching) {
      const seassonIsFull = arrayWatching[season - 1].every(
        (episode) => episode === true
      );
      setSeasonIsFull(seassonIsFull);
      setSeasonInfo(arrayWatching[season - 1]);
      return;
    }

    const newSeasonInfo = Array(infoOfSeason[season - 1].episodes.length).fill(
      false
    );
    setSeasonInfo(newSeasonInfo);
  }, [season, arrayWatching, infoOfSeason]);

  const toggleOpen = () => {
    setIsOpen(!IsOpen);
  };

  return (
    <div className="h-full w-full">
      <div className="w-full relative flex justify-center items-center h-20">
        <button
          className="text-3xl h-full w-[95%] hover:text-blancoblanco font-semibold"
          onClick={toggleOpen}
        >
          Temporada {season}{" "}
          <span className="text-2xl">({episodes.length})</span>
        </button>
        <div
          className={`${
            seasonIsFull ? "bg-azul4" : "bg-grisclaro"
          } w-[5%] h-full absolute left-[95%]`}
        >
          <button
            onClick={(e) => {
              handleSeasonWatched(
                e,
                season,
                serieId,
                seasonIsFull,
                setSeasonIsFull,
                setSeasonInfo,
                infoOfSeason
              );
            }}
            className="w-full h-full"
          ></button>
        </div>
      </div>
      {IsOpen ? (
        <div className="h-full w-full bg-negro">
          <div className="h-full py-1 w-full flex flex-col gap-1">
            {episodes.map((episode) => (
              <div
                className="flex bg-blancoblanco dark:bg-gris7 border- border-"
                key={episode.id}
              >
                <div className="">
                  <img width={250} src={IMG + episode.still_path} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex">
                    <h1 className="flex-1 pt-2 dark:text-grisclaro text-xl font-semibold flex justify-center items-center">
                      {episode.name}
                    </h1>
                  </div>
                  <div className="px-2 overflow-y-auto">
                    <p className="text-center overflow-hidden dark:text-grisclaro text-ellipsis line-clamp-3 font-overview">
                      {episode.overview}
                    </p>
                  </div>
                  <div className="w-full dark:text-azultwitter flex justify-center items-center text-xl  font-black text-purpuraoscuro">
                    <h1>
                      {season}x{episode.episode_number}
                    </h1>
                  </div>
                </div>
                <div
                  className={`${
                    seasonInfo
                      ? seasonInfo[episode.episode_number - 1]
                        ? "bg-azul4" //visto
                        : "bg-textogris" //no visto
                      : "bg-textogris"
                  } w-[10%] flex justify-center items-center bg-rojocorazo`}
                >
                  <button
                    onClick={(e) => {
                      handleCapWatched(
                        e,
                        serieId,
                        season,
                        episode.episode_number,
                        setArrayWatching
                      );
                    }}
                  >
                    VISTO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SectionSeason;
