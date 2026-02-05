import {
  createContext,
  useContext,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";
import { Season, Serie } from "../types";
import { AxiosResponse } from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface SeriesContextType {
  handleSubmit: (
    e: React.MouseEvent,
    serieId: number,
    setSeriesAdded: SetState<number[]>,
    seriesAdded: number[],
    setIsLoadingToFavorite: SetState<boolean>,
  ) => Promise<void>;
  handleUnfavoriteFromProfile: (
    e: React.MouseEvent,
    serieId: number,
    seriesUserFav: Serie[],
    setSeriesFav: SetState<Serie[] | null>,
  ) => Promise<void>;
  handleSubmitFromSerieDetail: (
    e: React.MouseEvent,
    serieId: number,
    setSeriesAdded: SetState<boolean>,
  ) => Promise<void>;
  handleWatched: (
    e: React.MouseEvent,
    serieId: number,
    setSerieWatched: SetState<boolean>,
  ) => Promise<void>;
  handleCapWatched: (
    e: React.MouseEvent | undefined,
    serieId: number,
    season: number,
    episode: number,
    setArrayWatching: SetState<boolean[][] | null>,
    codigo: number,
    setIsLoadingVisto: SetState<boolean>,
  ) => Promise<void>;
  handleSeasonWatched: (
    e: React.MouseEvent,
    season: number,
    serieId: number,
    seassonIsFull: boolean,
    setSeasonIsFull: SetState<boolean>,
    setSeasonInfo: SetState<boolean[] | null>,
    infoOfSeasons: Season[],
  ) => Promise<void>;
}

const SeriesContext = createContext<SeriesContextType | undefined>(undefined);

export const SeriesProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const handleSeasonWatched = useCallback(
    async (
      e: React.MouseEvent,
      season: number,
      serieId: number,
      seassonIsFull: boolean,
      setSeasonIsFull: SetState<boolean>,
      setSeasonInfo: SetState<boolean[] | null>,
      infoOfSeasons: Season[],
    ) => {
      e.preventDefault();

      try {
        if (!user) {
          navigate("/login");
          toast.error(t("notifications.login_required"));
          return;
        }

        const User = await getUser(user.username);
        const seriesUser = await serieService.getSeriesByUserId(User.id!);
        const serieUser = seriesUser.find((serie) => serie.tv_id == serieId);

        if (serieUser === undefined) {
          const serieCreada = await serieService.createSerie({
            tv_id: serieId,
            language: i18n.language,
          } as Partial<Serie>);

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
          await serieService.updateSerie(serieCreada.data.id, updateArray);

          setSeasonInfo(createArray[season - 1]);
          setSeasonIsFull(true);
          toast.success(t("notifications.season_watched", { season }));
          return;
        }

        const watching = serieUser.watching as boolean[][];

        const seasonWatched = seassonIsFull
          ? (setSeasonInfo((prev) => (prev ? prev.map(() => false) : null)),
            watching[season - 1].map(() => false))
          : (setSeasonInfo((prev) => (prev ? prev.map(() => true) : null)),
            watching[season - 1].map(() => true));

        const update = {
          $set: {
            [`watching.${season - 1}`]: seasonWatched,
          },
        };

        await serieService.updateSerie(serieUser.id!, update);
        setSeasonIsFull(!seassonIsFull);

        if (!seassonIsFull) {
          toast.success(t("notifications.season_watched", { season }));
        } else {
          toast.success(t("notifications.season_unwatched", { season }));
        }
      } catch (error) {
        console.error(error);
        toast.error(t("notifications.season_error"));
      }
    },
    [user, navigate, i18n.language, t],
  );

  const handleCapWatched = useCallback(
    async (
      e: React.MouseEvent | undefined,
      serieId: number,
      season: number,
      episode: number,
      setArrayWatching: SetState<boolean[][] | null>,
      codigo: number,
      setIsLoadingVisto: SetState<boolean>,
    ) => {
      if (codigo === 1 && e) {
        e.preventDefault();
      }
      setIsLoadingVisto(true);

      try {
        if (!user) {
          navigate("/login");
          toast.error(t("notifications.login_required_progress"));
          return;
        }
        const User = await getUser(user.username);
        const seriesUser = await serieService.getSeriesByUserId(User.id!);
        let serieUser = seriesUser.find((serie) => serie.tv_id == serieId);

        if (serieUser === undefined) {
          const serieCreada = await serieService.createSerie({
            tv_id: serieId,
            language: i18n.language,
          } as Partial<Serie>);
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

        await serieService.updateSerie(serieUser.id!, update);

        setArrayWatching(() => {
          const newEpisodes = JSON.parse(JSON.stringify(arrayWatched));
          newEpisodes[season - 1][episode - 1] =
            !arrayWatched[season - 1][episode - 1];
          return newEpisodes;
        });
      } catch (error) {
        console.error("Error al actualizar episodio", error);
        toast.error(t("notifications.episode_error"));
      }
      setIsLoadingVisto(false);
    },
    [user, navigate, i18n.language, t],
  );

  const handleWatched = useCallback(
    async (
      e: React.MouseEvent,
      serieId: number,
      setSerieWatched: SetState<boolean>,
    ) => {
      e.preventDefault();

      if (!user) {
        navigate("/login");
        toast.error(t("notifications.login_required"));
        return;
      }
      try {
        const User = await getUser(user.username);

        const seriesUser = await serieService.getSeriesByUserId(User.id!);
        const serieWatched = seriesUser.find((serie) => serie.tv_id == serieId);

        if (serieWatched != undefined) {
          await serieService.updateSerie(serieWatched.id!, {
            watched: !serieWatched.watched,
          } as Partial<Serie>);
          setSerieWatched(!serieWatched.watched!);
          if (!serieWatched.watched) toast.success(t("notifications.serie_watched"));
          else toast.success(t("notifications.serie_unwatched"));
        } else {
          const serieCreada = (await serieService.createSerie({
            tv_id: serieId,
            language: i18n.language,
          } as Partial<Serie>)) as AxiosResponse<Serie>;

          await serieService.updateSerie(serieCreada.data.id!, {
            watched: true,
          } as Partial<Serie>);
          setSerieWatched(true);
          toast.success(t("notifications.serie_watched"));
        }
      } catch (error) {
        console.error("Error al actualizar estado visto", error);
        toast.error(t("notifications.generic_error"));
      }
    },
    [user, navigate, i18n.language, t],
  );

  const handleSubmit = useCallback(
    async (
      e: React.MouseEvent,
      serieId: number,
      setSeriesAdded: SetState<number[]>,
      seriesAdded: number[],
      setIsLoadingToFavorite: SetState<boolean>,
    ) => {
      e.preventDefault();
      setIsLoadingToFavorite(true);

      try {
        if (!user) {
          navigate("/login");
          toast.error(t("notifications.login_required"));
          return;
        }
        const User = await getUser(user.username);

        const userSeries = await serieService.getSeriesByUserId(User.id!);

        const serieAlreadyAdded = userSeries.find(
          (serie) => serie.tv_id == serieId,
        );

        if (serieAlreadyAdded != undefined) {
          await serieService.updateSerie(serieAlreadyAdded.id!, {
            favorite: !serieAlreadyAdded.favorite,
          } as Partial<Serie>);
          if (serieAlreadyAdded.favorite) {
            setSeriesAdded(seriesAdded.filter((serie) => serie !== serieId));
            toast.success(t("notifications.fav_removed"));
          } else {
            setSeriesAdded([...seriesAdded, serieId]);
            toast.success(t("notifications.fav_added"));
          }
        } else {
          const serieCreada = (await serieService.createSerie({
            tv_id: serieId,
            language: i18n.language,
          } as Partial<Serie>)) as AxiosResponse<Serie>;
          await serieService.updateSerie(serieCreada.data.id!, {
            favorite: true,
          } as Partial<Serie>);
          setSeriesAdded([...seriesAdded, serieId]);
          toast.success(t("notifications.fav_added"));
        }
      } catch {
        toast.error(t("notifications.fav_error"));
      }
      setIsLoadingToFavorite(false);
    },
    [user, navigate, i18n.language, t],
  );

  const handleSubmitFromSerieDetail = useCallback(
    async (
      e: React.MouseEvent,
      serieId: number,
      setSeriesAdded: SetState<boolean>,
    ) => {
      e.preventDefault();

      try {
        if (!user) {
          navigate("/login");
          toast.error(t("notifications.login_required"));
          return;
        }
        const User = await getUser(user.username);
        const userSeries = await serieService.getSeriesByUserId(User.id!);
        const serieAlreadyAdded = userSeries.find(
          (serie) => serie.tv_id == serieId,
        );
        if (serieAlreadyAdded != undefined) {
          await serieService.updateSerie(serieAlreadyAdded.id!, {
            favorite: !serieAlreadyAdded.favorite,
          } as Partial<Serie>);
          if (serieAlreadyAdded.favorite) {
            setSeriesAdded(false);
            toast.success(t("notifications.fav_removed"));
          } else {
            setSeriesAdded(true);
            toast.success(t("notifications.fav_added"));
          }
        } else {
          const serieCreada = (await serieService.createSerie({
            tv_id: serieId,
            language: i18n.language,
          } as Partial<Serie>)) as AxiosResponse<Serie>;
          await serieService.updateSerie(serieCreada.data.id!, {
            favorite: true,
          } as Partial<Serie>);
          setSeriesAdded(true);
          toast.success(t("notifications.fav_added"));
        }
      } catch {
        toast.error(t("notifications.fav_error"));
      }
    },
    [user, navigate, i18n.language, t],
  );

  const handleUnfavoriteFromProfile = useCallback(
    async (
      e: React.MouseEvent,
      serieId: number,
      seriesUserFav: Serie[],
      setSeriesFav: SetState<Serie[] | null>,
    ) => {
      e.preventDefault();

      try {
        if (!user) {
          navigate("/login");
          toast.error(t("notifications.login_required"));
          return;
        }
        const User = await getUser(user.username);
        const seriesUser = await serieService.getSeriesByUserId(User.id!);
        const serieToDelete = seriesUser.find(
          (serie) => serie.tv_id == serieId,
        );

        if (serieToDelete) {
          await serieService.updateSerie(serieToDelete.id!, {
            favorite: false,
          } as Partial<Serie>);
          if (seriesUserFav) {
            setSeriesFav(
              seriesUserFav.filter((serie) => serie.tv_id !== serieId),
            );
          }
          toast.success(t("notifications.fav_removed"));
        }
      } catch (error) {
        console.error("Error al eliminar", error);
        toast.error(t("notifications.delete_fav_error"));
      }
    },
    [user, navigate, t],
  );

  const value = useMemo(
    () => ({
      handleSubmit,
      handleUnfavoriteFromProfile,
      handleSubmitFromSerieDetail,
      handleWatched,
      handleCapWatched,
      handleSeasonWatched,
    }),
    [
      handleSubmit,
      handleUnfavoriteFromProfile,
      handleSubmitFromSerieDetail,
      handleWatched,
      handleCapWatched,
      handleSeasonWatched,
    ],
  );

  return (
    <SeriesContext.Provider value={value}>{children}</SeriesContext.Provider>
  );
};

const useSeries = () => {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error("useSeries must be used within a SeriesProvider");
  }
  return context;
};

export default useSeries;
