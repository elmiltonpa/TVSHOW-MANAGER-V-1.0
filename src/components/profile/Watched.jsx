import { Link } from "react-router-dom";

const Watching = ({ seriesWatched, username }) => {
  return (
    <div className="bg-blancoblanco min-h-[300px] lg:h-full dark:bg-gris6 pb-5 flex flex-col overflow-y-auto gap-4">
      <h1 className="text-xl sm:text-2xl dark:text-grisclaro text-center pt-2 font-bold text-purpuraoscuro">
        Series que ya vi
      </h1>
      <div className="flex flex-col px-3 sm:px-5 gap-3 w-full">
        {seriesWatched.length > 0 ? (
          seriesWatched.map((serie) => (
            <div
              key={serie.id}
              className="dark:bg-gris7 dark:shadow-seriefav dark:hover:bg-gris7hover flex shadow-seriefav h-14 sm:h-16 rounded-lg shadow-negro"
            >
              <div className="w-full p-2">
                <Link to={`/${username}/{serie.tv_id}`}>
                  <h1 className="dark:text-blancoblanco flex h-full text-sm sm:text-base md:text-lg text-center font-medium flex-col justify-center items-center">
                    {serie.tv_title}
                  </h1>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-lg sm:text-xl md:text-2xl dark:text-grisclaro text-center px-2">
            Todavia no viste ninguna serie
          </div>
        )}
      </div>
    </div>
  );
};

export default Watching;
