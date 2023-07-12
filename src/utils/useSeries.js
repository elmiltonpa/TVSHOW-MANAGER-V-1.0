/* eslint-disable indent */
import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";

const useSeries = () => {
  const navigate = useNavigate();

  const handleSeasonWatched = async (
    e,
    season,
    serieId,
    seassonIsFull,
    setSeasonIsFull,
    setSeasonInfo,
    infoOfSeasons
  ) => {
    //MARCAR TEMPORADA COMO VISTA
    e.preventDefault();
    const session = JSON.parse(window.localStorage.getItem("session"));
    console.log(session);
    try {
      const sessionExists = session !== null;
      if (!sessionExists) {
        navigate("/login");
        return;
      }
      const { token, username } = session;
      const User = await getUser(username);
      const seriesUser = await serieService.getSeriesByUserId(User.id);
      const serieUser = seriesUser.find((serie) => serie.tv_id == serieId);

      if (serieUser === undefined) {
        const serieCreada = await serieService.createSerie(
          { id: serieId },
          token
        );

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

        await serieService.updateSerie(serieCreada.data.id, updateArray, token);

        setSeasonInfo(createArray[season - 1]);
        setSeasonIsFull(true);

        return;
      }

      const seasonWatched = seassonIsFull
        ? (setSeasonInfo((prev) => prev.map(() => false)),
          serieUser.watching[season - 1].map(() => false))
        : (setSeasonInfo((prev) => prev.map(() => true)),
          serieUser.watching[season - 1].map(() => true));

      const update = {
        $set: {
          [`watching.${season - 1}`]: seasonWatched,
        },
      };

      await serieService.updateSerie(serieUser.id, update, token);
      setSeasonIsFull(!seassonIsFull);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCapWatched = async (
    e,
    serieId,
    season,
    episode,
    setArrayWatching
  ) => {
    //PASAR EPISODE COMO episode.episode_number Y SEASON COMO season

    e.preventDefault();

    const session = JSON.parse(window.localStorage.getItem("session"));

    try {
      if (!session) {
        navigate("/login");
        return;
      }
      const { token, username } = session;
      const User = await getUser(username);
      const seriesUser = await serieService.getSeriesByUserId(User.id);
      const serieUser = seriesUser.find((serie) => serie.tv_id == serieId);
      const arrayWatched = serieUser.watching;
      console.log(arrayWatched, "arraywatched");
      const update = {
        $set: {
          [`watching.${season - 1}.${episode - 1}`]:
            !arrayWatched[season - 1][episode - 1],
        },
      };
      console.log(update);

      await serieService.updateSerie(serieUser.id, update, token);

      setArrayWatching(() => {
        const newEpisodes = arrayWatched;
        newEpisodes[season - 1][episode - 1] =
          !arrayWatched[season - 1][episode - 1];

        return newEpisodes;
      });
    } catch (error) {
      console.log("Error al acutalizar serie", error);
    }
  };

  //AGREGAR A SERIES VISTAS DESDE EL DETALLE DE SERIE -----------
  const handleWatched = async (e, serieId, setSerieWatched) => {
    e.preventDefault();
    const session = JSON.parse(window.localStorage.getItem("session"));

    if (!session) {
      navigate("/login");
      return;
    }
    try {
      const { token, username } = session;
      const User = await getUser(username);

      const seriesUser = await serieService.getSeriesByUserId(User.id);
      const serieWatched = seriesUser.find((serie) => serie.tv_id == serieId);

      if (serieWatched != undefined) {
        await serieService.updateSerie(
          serieWatched.id,
          { watched: !serieWatched.watched },
          token
        );
        setSerieWatched(!serieWatched.watched);
      } else {
        const serieCreada = await serieService.createSerie(
          { id: serieId },
          token
        );

        await serieService.updateSerie(
          serieCreada.data.id,
          { watched: true },
          token
        );
        setSerieWatched(true);
      }
    } catch (error) {
      console.log("Error al acutalizar serie", error);
    }
  };

  //AGREGAR O QUITAR DE FAVORITOS DESDE EL HOME ---------
  const handleSubmit = async (
    e,
    serieId,
    setSeriesAdded,
    seriesAdded,
    setIsLoadingToFavorite
  ) => {
    e.preventDefault();
    setIsLoadingToFavorite(true);
    const session = JSON.parse(window.localStorage.getItem("session"));

    try {
      if (!session) {
        navigate("/login");
        return;
      }
      const { token, username } = session;
      const User = await getUser(username);

      const userSeries = await serieService.getSeriesByUserId(User.id);

      const serieAlreadyAdded = userSeries.find(
        (serie) => serie.tv_id == serieId
      );

      if (serieAlreadyAdded != undefined) {
        await serieService.updateSerie(
          serieAlreadyAdded.id,
          { favorite: !serieAlreadyAdded.favorite },
          token
        );
        if (serieAlreadyAdded.favorite) {
          setSeriesAdded(seriesAdded.filter((serie) => serie !== serieId));
          console.log("Serie quitada de favoritos");
        } else {
          setSeriesAdded([...seriesAdded, serieId]);
          console.log("Serie agregada a favoritos");
        }
      } else {
        const serieCreada = await serieService.createSerie(
          { id: serieId },
          token
        );
        await serieService.updateSerie(
          serieCreada.data.id,
          { favorite: true },
          token
        );
        setSeriesAdded([...seriesAdded, serieId]);
        console.log("Serie agregada a favoritos");
      }
    } catch (error) {
      console.log("no hay token pa");
    }
    setIsLoadingToFavorite(false);
  };

  //PARA AGREGAR SERIE A FAVORITOS DESDE EL DETALLE DE SERIE--------------
  const handleSubmitFromSerieDetail = async (e, serieId, setSeriesAdded) => {
    e.preventDefault();
    const session = JSON.parse(window.localStorage.getItem("session"));

    try {
      if (!session) {
        navigate("/login");
        return;
      }
      const { token, username } = session;
      const User = await getUser(username);
      const userSeries = await serieService.getSeriesByUserId(User.id);
      const serieAlreadyAdded = userSeries.find(
        (serie) => serie.tv_id == serieId
      );
      if (serieAlreadyAdded != undefined) {
        await serieService.updateSerie(
          serieAlreadyAdded.id,
          { favorite: !serieAlreadyAdded.favorite },
          token
        );
        if (serieAlreadyAdded.favorite) {
          setSeriesAdded(false);
          console.log("Serie quitada de favoritos");
        } else {
          setSeriesAdded(true);
          console.log("Serie agregada a favoritos");
        }
      } else {
        const serieCreada = await serieService.createSerie(
          { id: serieId },
          token
        );
        await serieService.updateSerie(
          serieCreada.data.id,
          { favorite: true },
          token
        );
        setSeriesAdded(true);
        console.log("Serie agregada a favoritos");
      }
    } catch (error) {
      console.log("Error al agregar serie a favoritos");
    }
  };

  //PARA ELIMINAR SERIE DE FAVORITOS DESDE EL PERFIL
  const handleUnfavoriteFromProfile = async (
    e,
    serieId,
    seriesUserFav,
    setSeriesFav
  ) => {
    e.preventDefault();
    const session = JSON.parse(window.localStorage.getItem("session"));

    try {
      if (!session) {
        navigate("/login");
        return;
      }
      const { token, username } = session;
      const User = await getUser(username);
      const seriesUser = await serieService.getSeriesByUserId(User.id);
      const serieToDelete = seriesUser.find((serie) => serie.tv_id == serieId);

      await serieService.updateSerie(
        serieToDelete.id,
        { favorite: false },
        token
      );
      setSeriesFav(seriesUserFav.filter((serie) => serie.tv_id !== serieId));
      console.log("Eliminada de favoritos");
    } catch (error) {
      console.log("Error al eliminar serie de favoritos", error);
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
