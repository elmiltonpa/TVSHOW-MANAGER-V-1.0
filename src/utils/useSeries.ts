/* eslint-disable indent */
import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";
import { Season, Serie } from "../types";
import { AxiosResponse } from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// Tipos auxiliares
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const useSeries = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSeasonWatched = async (
    e: React.MouseEvent,
    season: number,
    serieId: number,
    seassonIsFull: boolean,
    setSeasonIsFull: SetState<boolean>,
    setSeasonInfo: SetState<boolean[] | null>,
    infoOfSeasons: Season[]
  ) => {
    e.preventDefault();

    try {
      if (!user) {
        navigate("/login");
        toast.error("Debes iniciar sesión");
        return;
      }
      
      const User = await getUser(user.username);
      const seriesUser = await serieService.getSeriesByUserId(User.id!);
      const serieUser = seriesUser.find((serie) => serie.tv_id == serieId);

      if (serieUser === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const serieCreada: any = await serieService.createSerie({ tv_id: serieId } as Partial<Serie>);

        const createArray = infoOfSeasons.map((season) => {
          const cantidadEpisodios = season.episodes.length;
          return Array(cantidadEpisodios).fill(false);
        });
        createArray[season - 1] = createArray[season - 1].map(() => true);
        const updateArray = {
          $set: {
            watching: createArray,
          },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await serieService.updateSerie(serieCreada.data.id, updateArray as any);

        setSeasonInfo(createArray[season - 1]);
        setSeasonIsFull(true);
        toast.success(`Temporada ${season} marcada como vista`);
        return;
      }

      const watching = serieUser.watching as boolean[][];

      const seasonWatched = seassonIsFull
        ? (setSeasonInfo((prev) => prev ? prev.map(() => false) : null),
          watching[season - 1].map(() => false))
        : (setSeasonInfo((prev) => prev ? prev.map(() => true) : null),
          watching[season - 1].map(() => true));

      const update = {
        $set: {
          [`watching.${season - 1}`]: seasonWatched,
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await serieService.updateSerie(serieUser.id!, update as any);
      setSeasonIsFull(!seassonIsFull);
      
      if (!seassonIsFull) {
        toast.success(`Temporada ${season} marcada como vista`);
      } else {
        toast.success(`Temporada ${season} desmarcada`);
      }

    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la temporada");
    }
  };

  const handleCapWatched = async (
    e: React.MouseEvent | undefined,
    serieId: number,
    season: number,
    episode: number,
    setArrayWatching: SetState<boolean[][] | null>,
    codigo: number,
    setIsLoadingVisto: SetState<boolean>
  ) => {
    if (codigo === 1 && e) {
      e.preventDefault();
    }
    setIsLoadingVisto(true);
    
    try {
      if (!user) {
        navigate("/login");
        toast.error("Inicia sesión para guardar tu progreso");
        return;
      }
      const User = await getUser(user.username);
      const seriesUser = await serieService.getSeriesByUserId(User.id!);
      let serieUser = seriesUser.find((serie) => serie.tv_id == serieId);
      
      if (serieUser === undefined) {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const serieCreada: any = await serieService.createSerie({ tv_id: serieId } as Partial<Serie>);
        serieUser = serieCreada.data;
      }
      
      if (!serieUser) return;

      const arrayWatched = serieUser.watching as boolean[][];

      const update = {
        $set: {
          [`watching.${season - 1}.${episode - 1}`]:
            !arrayWatched[season - 1][episode - 1],
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await serieService.updateSerie(serieUser.id!, update as any);

      setArrayWatching(() => {
        const newEpisodes = JSON.parse(JSON.stringify(arrayWatched));
        newEpisodes[season - 1][episode - 1] = !arrayWatched[season - 1][episode - 1];
        return newEpisodes;
      });
      
      // Feedback opcional para caps individuales (puede ser ruidoso si marcan muchos rapido)
      // toast.success("Progreso guardado"); 

    } catch (error) {
      console.error("Error al actualizar episodio", error);
      toast.error("No se pudo marcar el episodio");
    }
    setIsLoadingVisto(false);
  };

  const handleWatched = async (e: React.MouseEvent, serieId: number, setSerieWatched: SetState<boolean>) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      toast.error("Debes iniciar sesión");
      return;
    }
    try {
      const User = await getUser(user.username);

      const seriesUser = await serieService.getSeriesByUserId(User.id!);
      const serieWatched = seriesUser.find((serie) => serie.tv_id == serieId);

      if (serieWatched != undefined) {
        await serieService.updateSerie(
          serieWatched.id!,
          { watched: !serieWatched.watched } as Partial<Serie>
        );
        setSerieWatched(!serieWatched.watched!);
        if (!serieWatched.watched) toast.success("Serie marcada como vista");
        else toast.success("Serie desmarcada de vistas");
      } else {
        const serieCreada = await serieService.createSerie({ tv_id: serieId } as Partial<Serie>) as AxiosResponse<Serie>;

        await serieService.updateSerie(
          serieCreada.data.id!,
          { watched: true } as Partial<Serie>
        );
        setSerieWatched(true);
        toast.success("Serie marcada como vista");
      }
    } catch (error) {
      console.error("Error al actualizar estado visto", error);
      toast.error("Ocurrió un error");
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent,
    serieId: number,
    setSeriesAdded: SetState<number[]>,
    seriesAdded: number[],
    setIsLoadingToFavorite: SetState<boolean>
  ) => {
    e.preventDefault();
    setIsLoadingToFavorite(true);

    try {
      if (!user) {
        navigate("/login");
        toast.error("Debes iniciar sesión");
        return;
      }
      const User = await getUser(user.username);

      const userSeries = await serieService.getSeriesByUserId(User.id!);

      const serieAlreadyAdded = userSeries.find(
        (serie) => serie.tv_id == serieId
      );

      if (serieAlreadyAdded != undefined) {
        await serieService.updateSerie(
          serieAlreadyAdded.id!,
          { favorite: !serieAlreadyAdded.favorite } as Partial<Serie>
        );
        if (serieAlreadyAdded.favorite) {
          setSeriesAdded(seriesAdded.filter((serie) => serie !== serieId));
          toast.success("Eliminada de favoritos");
        } else {
          setSeriesAdded([...seriesAdded, serieId]);
          toast.success("Añadida a favoritos");
        }
      } else {
        const serieCreada = await serieService.createSerie({ tv_id: serieId } as Partial<Serie>) as AxiosResponse<Serie>;
        await serieService.updateSerie(
          serieCreada.data.id!,
          { favorite: true } as Partial<Serie>
        );
        setSeriesAdded([...seriesAdded, serieId]);
        toast.success("Añadida a favoritos");
      }
    } catch {
      toast.error("Error al actualizar favoritos");
    }
    setIsLoadingToFavorite(false);
  };

  const handleSubmitFromSerieDetail = async (e: React.MouseEvent, serieId: number, setSeriesAdded: SetState<boolean>) => {
    e.preventDefault();

    try {
      if (!user) {
        navigate("/login");
        toast.error("Debes iniciar sesión");
        return;
      }
      const User = await getUser(user.username);
      const userSeries = await serieService.getSeriesByUserId(User.id!);
      const serieAlreadyAdded = userSeries.find(
        (serie) => serie.tv_id == serieId
      );
      if (serieAlreadyAdded != undefined) {
        await serieService.updateSerie(
          serieAlreadyAdded.id!,
          { favorite: !serieAlreadyAdded.favorite } as Partial<Serie>
        );
        if (serieAlreadyAdded.favorite) {
          setSeriesAdded(false);
          toast.success("Eliminada de favoritos");
        } else {
          setSeriesAdded(true);
          toast.success("Añadida a favoritos");
        }
      } else {
        const serieCreada = await serieService.createSerie({ tv_id: serieId } as Partial<Serie>) as AxiosResponse<Serie>;
        await serieService.updateSerie(
          serieCreada.data.id!,
          { favorite: true } as Partial<Serie>
        );
        setSeriesAdded(true);
        toast.success("Añadida a favoritos");
      }
    } catch {
      toast.error("Error al actualizar favoritos");
    }
  };

  const handleUnfavoriteFromProfile = async (
    e: React.MouseEvent,
    serieId: number,
    seriesUserFav: Serie[],
    setSeriesFav: SetState<Serie[] | null>
  ) => {
    e.preventDefault();

    try {
      if (!user) {
        navigate("/login");
        toast.error("Debes iniciar sesión");
        return;
      }
      const User = await getUser(user.username);
      const seriesUser = await serieService.getSeriesByUserId(User.id!);
      const serieToDelete = seriesUser.find((serie) => serie.tv_id == serieId);
      
      if (serieToDelete) {
          await serieService.updateSerie(
            serieToDelete.id!,
            { favorite: false } as Partial<Serie>
          );
          if (seriesUserFav) {
             setSeriesFav(seriesUserFav.filter((serie) => serie.tv_id !== serieId));
          }
          toast.success("Eliminada de favoritos");
      }
    } catch (error) {
      console.error("Error al eliminar", error);
      toast.error("No se pudo eliminar de favoritos");
    }
  };

  return {
    handleSubmit,
    handleUnfavoriteFromProfile,
    handleSubmitFromSerieDetail,
    handleWatched,
    handleCapWatched,
    handleSeasonWatched,
  };
};

export default useSeries;
