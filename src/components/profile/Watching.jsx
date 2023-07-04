import { Link } from "react-router-dom";

const Watching = ({ seriesWatched, username }) => {
  return (
    <div className="bg-blancoblanco dark:bg-gris6 pb-5 flex flex-col overflow-y-auto h-full gap-4">
      <h1 className="text-2xl dark:text-grisclaro text-center pt-2 font-bold text-purpuraoscuro">
        Series que ya vi
      </h1>
      <div className="flex flex-col px-5 gap-3 w-full">
        {seriesWatched.length > 0 ? (
          seriesWatched.map((serie) => (
            <div
              key={serie.id}
              className="dark:bg-gris7 dark:shadow-seriefav dark:hover:bg-gris7hover flex shadow-seriefav h-16 rounded-lg shadow-negro"
            >
              <div className="w-full">
                <Link to={`/${username}/{serie.tv_id}`}>
                  <h1 className="dark:text-blancoblanco flex h-full text-lg text-center font-medium  flex-col justify-center items-center">
                    {serie.tv_title}
                  </h1>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-2xl text-center">
            Todavia no viste ninguna serie
          </div>
        )}
      </div>
    </div>
  );
};

export default Watching;
