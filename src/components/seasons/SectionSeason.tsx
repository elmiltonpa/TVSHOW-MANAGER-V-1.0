import { useState, useEffect } from "react";
import useSeries from "../../utils/useSeries";
import { Season, Episode } from "../../types";

const IMG = "https://image.tmdb.org/t/p/w500";

interface SectionSeasonProps {
  season: number;
  episodes: Episode[];
  serieId: string | number;
  seasonwatching: boolean[][] | null;
  infoOfSeason: Season[];
}

const SectionSeason = ({
  season,
  episodes,
  serieId,
  seasonwatching,
  infoOfSeason,
}: SectionSeasonProps) => {
  const [IsOpen, setIsOpen] = useState(false);
  const [arrayWatching, setArrayWatching] = useState<boolean[][] | null>(
    seasonwatching,
  );
  const [seasonInfo, setSeasonInfo] = useState<boolean[] | null>(null);
  const [seasonIsFull, setSeasonIsFull] = useState(false);
  const { handleCapWatched, handleSeasonWatched } = useSeries();
  const [isLoadingVisto, setIsLoadingVisto] = useState(false);

  useEffect(() => {
    setArrayWatching(seasonwatching);
  }, [seasonwatching]);

  useEffect(() => {
    if (arrayWatching && arrayWatching[season - 1]) {
      const seassonIsFull = arrayWatching[season - 1].every(
        (episode) => episode === true,
      );
      setSeasonIsFull(seassonIsFull);
      setSeasonInfo(arrayWatching[season - 1]);
      return;
    }

    if (
      infoOfSeason &&
      infoOfSeason[season - 1] &&
      infoOfSeason[season - 1].episodes
    ) {
      const newSeasonInfo = Array(
        infoOfSeason[season - 1].episodes.length,
      ).fill(false);
      setSeasonInfo(newSeasonInfo);
    }
  }, [season, arrayWatching, infoOfSeason]);

  const toggleOpen = () => {
    setIsOpen(!IsOpen);
  };

  return (
    <div className="h-full w-full">
      <div className="w-full relative flex justify-center items-center h-16 sm:h-20">
        <button
          className="text-xl sm:text-2xl md:text-3xl h-full w-[90%] sm:w-[95%] hover:text-blancoblanco font-semibold"
          onClick={toggleOpen}
        >
          Temporada {season}{" "}
          <span className="text-lg sm:text-xl md:text-2xl">
            ({episodes.length})
          </span>
        </button>
        <div
          className={`${
            seasonIsFull ? "bg-azul4" : "bg-grisclaro"
          } w-[10%] sm:w-[5%] h-full absolute right-0`}
        >
          <button
            onClick={(e) => {
              handleSeasonWatched(
                e,
                season,
                Number(serieId),
                seasonIsFull,
                setSeasonIsFull,
                setSeasonInfo,
                infoOfSeason,
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
                className="flex flex-col sm:flex-row bg-blancoblanco dark:bg-gris7 border- border-"
                key={episode.id}
              >
                <div className="w-full sm:w-auto flex justify-center">
                  <img
                    className="w-full sm:w-[200px] md:w-[250px] h-auto object-cover"
                    src={IMG + episode.still_path}
                    alt={episode.name}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between p-2 sm:p-0">
                  <div className="flex">
                    <div className="flex-1 pt-2 dark:text-grisclaro text-lg sm:text-xl font-semibold flex justify-center items-center">
                      <h1 className="text-center px-2">{episode.name}</h1>
                    </div>
                  </div>
                  <div className="px-2 overflow-y-auto">
                    <p className="text-center text-sm sm:text-base overflow-hidden dark:text-grisclaro text-ellipsis line-clamp-3 font-overview">
                      {episode.overview}
                    </p>
                  </div>
                  <div className="w-full dark:text-azultwitter flex justify-center items-center text-lg sm:text-xl font-black text-purpuraoscuro pb-2 sm:pb-0">
                    <h1>
                      {season}x{episode.episode_number}
                    </h1>
                  </div>
                </div>
                <div
                  className={`${
                    seasonInfo
                      ? seasonInfo[episode.episode_number - 1]
                        ? "bg-azul4"
                        : "bg-textogris"
                      : "bg-textogris"
                  } w-full sm:w-[15%] md:w-[10%] flex justify-center items-center min-h-[40px]`}
                >
                  <button
                    className={`${
                      isLoadingVisto ? "cursor-not-allowed" : ""
                    } w-full h-full text-sm sm:text-base font-semibold`}
                    disabled={isLoadingVisto}
                    onClick={(e) => {
                      handleCapWatched(
                        e,
                        Number(serieId),
                        season,
                        episode.episode_number,
                        setArrayWatching,
                        1,
                        setIsLoadingVisto,
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
