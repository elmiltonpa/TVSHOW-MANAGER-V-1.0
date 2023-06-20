import { useState } from "react";
import useSeries from "../../utils/useSeries";
const IMG = "https://image.tmdb.org/t/p/w500";

const SectionSeason = ({ season, episodes, serieId }) => {
  const [IsOpen, setIsOpen] = useState(false);
  const { handleCapWatched } = useSeries();

  console.log("b");
  const toggleOpen = () => {
    console.log("a");
    if (!IsOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-center items-center border-b-4 h-20">
        <button
          className="text-3xl w-full hover:text-blancoblanco font-semibold"
          onClick={toggleOpen}
        >
          Temporada {season}
        </button>
      </div>
      {IsOpen ? (
        <div className="h-full w-full bg-negropurpura">
          <div className="h-full w-full flex flex-col ">
            {episodes.map((episode) => (
              <div
                className="flex bg-blancoblanco border-b-[5px] border-negropurpura"
                key={episode.id}
              >
                <div className="">
                  <img width={250} src={IMG + episode.still_path} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex">
                    <h1 className="flex-1 pt-2 underline text-xl font-semibold flex justify-center items-center">
                      {episode.name}
                    </h1>
                  </div>
                  <div className="px-2 overflow-y-auto">
                    <p className="text-center overflow-hidden text-ellipsis line-clamp-3 font-overview">
                      {episode.overview}
                    </p>
                  </div>
                  <div className="w-full  flex justify-center items-center text-xl  font-black text-purpuraoscuro">
                    <h1>
                      {season}x{episode.episode_number}
                    </h1>
                  </div>
                </div>
                <div className="w-[10%] bg-purpuraoscuro">
                  <button
                    onClick={(e) =>
                      handleCapWatched(
                        e,
                        serieId,
                        season,
                        episode.episode_number
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
