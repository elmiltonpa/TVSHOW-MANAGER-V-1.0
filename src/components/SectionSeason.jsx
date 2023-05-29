import { useState } from "react";

const IMG = "https://image.tmdb.org/t/p/w500";

const SectionSeason = ({ season, episodes }) => {
  const [IsOpen, setIsOpen] = useState(false);
  console.log(episodes);
  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-center items-center h-20">
        <button
          className="text-3xl w-full hover:text-blancoblanco font-semibold"
          onClick={() => setIsOpen(!IsOpen)}
        >
          Temporada {season}
        </button>
      </div>
      {IsOpen ? (
        <div className="h-full w-full  bg-negropurpura">
          <div className="h-full w-full flex flex-col ">
            {episodes.map((episode) => (
              <div
                className="flex bg-blancoblanco border-b-[5px] border-negropurpura"
                key={episode.id}
              >
                <div className="">
                  <img width={170} src={IMG + episode.still_path} />
                </div>
                <div className="flex-1">
                  <h1>{episode.name}</h1>
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
