import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import useSeries from "../../utils/useSeries";
import { Serie } from "../../types";

interface FavSeriesProps {
  seriesFav: Serie[];
  setSeriesFav: React.Dispatch<React.SetStateAction<Serie[] | null>>;
}

export const FavSeries = ({ seriesFav, setSeriesFav }: FavSeriesProps) => {
  const { handleUnfavoriteFromProfile } = useSeries();

  return (
    <div className="min-h-75 lg:h-full dark:bg-background-dark flex pb-5 flex-col overflow-y-auto bg-white gap-4">
      <h1 className="text-xl sm:text-2xl dark:text-gray-light text-center pt-2 font-bold text-primary">
        Series favoritas
      </h1>
      <div className="flex flex-col px-3 sm:px-5 gap-3 w-full">
        {" "}
        {seriesFav.length > 0 ? (
          seriesFav.map((serie) => (
            <div
              key={serie.id}
              className="dark:bg-surface-medium dark:shadow-seriefav dark:hover:bg-surface-hover flex shadow-seriefav h-14 sm:h-16 rounded-lg shadow-foreground"
            >
              <div className="w-[83%] pl-[5%] sm:pl-[9%] p-2">
                <Link to={`/home/${serie.tv_id}`} className="h-full">
                  <h1 className="dark:text-white flex h-full text-sm sm:text-base md:text-lg text-center font-medium flex-col justify-center items-center">
                    {serie.tv_title}
                  </h1>
                </Link>
              </div>
              <div className="w-[17%] flex hover:bg-foreground justify-center items-center">
                <button
                  title="Eliminar de favoritos"
                  onClick={(e) =>
                    handleUnfavoriteFromProfile(
                      e,
                      serie.tv_id,
                      seriesFav,
                      setSeriesFav,
                    )
                  }
                  className="h-full hover:text-white dark:text-gray-light w-full flex justify-center items-center"
                >
                  <AiFillDelete size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-lg sm:text-xl md:text-2xl dark:text-gray-light text-center px-2">
            Aun no tienes series favoritas
          </div>
        )}
      </div>
    </div>
  );
};
