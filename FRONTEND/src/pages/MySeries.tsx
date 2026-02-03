import { useEffect, useState } from "react";
import seriesService from "../services/series";
import getUser from "../services/user";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";
import { Serie } from "../types";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const MySeries = () => {
  const [series, setSeries] = useState<Serie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingToDelete, setIsLoadingToDelete] = useState(false);

  const { user } = useAuth();

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsLoadingToDelete(true);
    try {
      await seriesService.deleteSerie(id);
      setSeries(series.filter((serie) => serie.id != id));
      toast.success("Serie eliminada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la serie");
    }
    setIsLoadingToDelete(false);
  };

  useEffect(() => {
    const fetchSeries = async () => {
      if (user) {
        const User = await getUser(user.username);
        const series = await seriesService.getSeriesByUserId(User.id!);
        setSeries(series);
        setIsLoading(false);
      }
    };
    if (user) {
      fetchSeries();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="h-screen bg-foreground flex justify-center pt-20 text-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center dark:bg-accent-purple bg-accent-light px-3 sm:px-6">
      <div className="bg-white dark:bg-surface-dark overflow-y-auto w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-full py-5 px-3 sm:px-6 md:px-12 lg:px-44">
        <div className="py-5 min-h-22.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl dark:text-white text-center font-overview font-semibold">
            Mis series
          </h1>
          <h3 className="text-base sm:text-lg md:text-xl text-center dark:text-pink text-error font-noto font-normal px-2">
            Si eliminas la serie, eliminas todos los datos
          </h3>
        </div>
        <div className="flex flex-col gap-4 py-4 items-center">
          {series.length > 0 ? (
            series.map((serie, index) => (
              <div
                key={index}
                className="bg-white dark:bg-surface-medium shadow-seriefav shadow-foreground flex w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-14 sm:h-16"
              >
                <div className="w-[85%] sm:w-[90%] flex justify-center items-center px-2">
                  <Link to={`/home/${serie.tv_id}`}>
                    <h1 className="text-base sm:text-lg md:text-xl dark:text-gray-light font-semibold text-center">
                      {serie.tv_title}
                    </h1>
                  </Link>
                </div>
                <div
                  className={`${
                    isLoadingToDelete ? "bg-white" : "hover:bg-foreground"
                  } w-[15%] sm:w-[10%]`}
                >
                  {serie.id && (
                    <button
                      disabled={isLoadingToDelete}
                      onClick={(e) => handleDelete(e, serie.id!)}
                      className={`${
                        isLoadingToDelete
                          ? "cursor-not-allowed dark:bg-surface-medium"
                          : "hover:text-white dark:text-gray-light"
                      } w-full h-full text-base sm:text-lg flex justify-center items-center`}
                    >
                      <AiFillDelete />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-xl sm:text-2xl dark:text-gray-light font-semibold text-foreground text-center">
              No hay datos
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySeries;
