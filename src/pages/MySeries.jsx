import { useEffect, useState } from "react";
import seriesService from "../services/series";
import getUser from "../services/user";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";

const MySeries = () => {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [isLoadingToDelete, setIsLoadingToDelete] = useState(false);

  const session = JSON.parse(window.localStorage.getItem("session"));

  const handleDelete = async (e, id, token) => {
    e.preventDefault();
    setIsLoadingToDelete(true);
    try {
      await seriesService.deleteSerie(id, token);
      setSeries(series.filter((serie) => serie.id != id));
    } catch (error) {
      console.log(error);
    }
    setIsLoadingToDelete(false);
  };

  useEffect(() => {
    const session = JSON.parse(window.localStorage.getItem("session"));
    const fetchSeries = async () => {
      const { username } = session;
      const User = await getUser(username);
      const series = await seriesService.getSeriesByUserId(User.id);
      setSeries(series);
      setUser(true);
      setIsLoading(false);
    };
    if (session) {
      fetchSeries();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-negro flex justify-center pt-20 text-blancoblanco">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center dark:bg-twitch bg-purpura px-3 sm:px-6">
      {user ? (
        <div className="bg-blancoblanco dark:bg-gris5 overflow-y-auto w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-full py-5 px-3 sm:px-6 md:px-12 lg:px-44">
          <div className="py-5 min-h-[90px]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl dark:text-blancoblanco text-center font-overview font-semibold">
              Mis series
            </h1>
            <h3 className="text-base sm:text-lg md:text-xl text-center dark:text-rosa text-rojo font-noto font-normal px-2">
              Si eliminas la serie, eliminas todos los datos
            </h3>
          </div>
          <div className="flex flex-col gap-4 py-4 items-center">
            {series.length > 0 ? (
              series.map((serie, index) => (
                <div
                  key={index}
                  className="bg-blancoblanco dark:bg-gris7 shadow-seriefav shadow-negro flex w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-14 sm:h-16"
                >
                  <div className="w-[85%] sm:w-[90%] flex justify-center items-center px-2">
                    <Link to={`/home/${serie.tv_id}`}>
                      <h1 className="text-base sm:text-lg md:text-xl dark:text-grisclaro font-semibold text-center">
                        {serie.tv_title}
                      </h1>
                    </Link>
                  </div>
                  <div
                    className={`${
                      isLoadingToDelete ? "bg-blancoblanco" : "hover:bg-negro"
                    } w-[15%] sm:w-[10%]`}
                  >
                    <button
                      disabled={isLoadingToDelete}
                      onClick={(e) => handleDelete(e, serie.id, session.token)}
                      className={`${
                        isLoadingToDelete
                          ? "cursor-not-allowed dark:bg-gris7"
                          : "hover:text-blancoblanco dark:text-grisclaro"
                      } w-full h-full text-base sm:text-lg flex justify-center items-center`}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xl sm:text-2xl dark:text-grisclaro font-semibold text-negro text-center">
                No hay datos
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen w-full sm:w-[90%] md:w-[70%] bg-blancoblanco dark:bg-gris6 dark:text-grisclaro text-center text-xl sm:text-2xl md:text-3xl pt-10 flex justify-center items-start">
          No has iniciado sesion
        </div>
      )}
    </div>
  );
};

export default MySeries;
