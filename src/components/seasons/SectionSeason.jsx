import { useState, useEffect } from "react";
import useSeries from "../../utils/useSeries";
const IMG = "https://image.tmdb.org/t/p/w500";

const SectionSeason = ({ season, episodes, serieId, seasonwatching }) => {
  const [IsOpen, setIsOpen] = useState(false);
  const [seasons2, setSeasons2] = useState(seasonwatching);
  const { handleCapWatched } = useSeries();

  useEffect(() => {}, [seasonwatching]);

  const session = JSON.parse(window.localStorage.getItem("session"));
  let seasoninfo = null;
  let seassonIsFull = null;

  const toggleOpen = () => {
    setIsOpen(!IsOpen);
  };

  if (session) {
    seasoninfo = seasons2[season - 1];
    seassonIsFull = seasons2[season - 1].every((episode) => episode === true);
  }

  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-center items-center h-20">
        {console.log(seassonIsFull)}
        <button
          className="text-3xl h-full w-[95%] hover:text-blancoblanco font-semibold"
          onClick={toggleOpen}
        >
          Temporada {season}
        </button>
        <div
          className={`${
            seassonIsFull ? "bg-rojocorazon" : "bg-twitch"
          } w-[5%] h-full bg-`}
        >
          <button className=""></button>
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
                    seasoninfo
                      ? seasoninfo[episode.episode_number - 1]
                        ? "bg-azul4" //visto
                        : "bg-textogris" //no visto
                      : null
                  } w-[10%] flex justify-center items-center bg-rojocorazo`}
                >
                  <button
                    onClick={(e) =>
                      handleCapWatched(
                        e,
                        serieId,
                        season,
                        episode.episode_number,
                        setSeasons2
                      )
                    }
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
