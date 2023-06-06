import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

export const FavSeries = ({ series, username }) => {
  return (
    <div className="h-full flex flex-col bg-blancoblanco gap-4">
      <h1 className="text-2xl text-center pt-2 font-semibold text- text-purpuraoscuro">
        Series favoritas
      </h1>
      <div className="flex flex-col gap-3 w-full">
        {series.length > 0 ? (
          series.map((serie) => (
            <div key={serie.id} className="bg-red-300 flex">
              <div className="w-[80%]">
                <h1 className="h-full flex flex-col justify-center items-center">
                  {serie.tv_title}
                </h1>
                <div className="">
                  <Link to={`/${username}/${serie.tv_id}`}>VER</Link>
                </div>
              </div>
              <div className="w-[20%] flex justify-center items-center">
                <button className="">
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-2xl text-center">
            Aun no tienes series favoritas :(
          </div>
        )}
      </div>
    </div>
  );
};
