import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";

const useSeries = () => {
  const navigate = useNavigate();

  const handleCapWatched = async (e, serieId, season, episode,setEpisodes) => {
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
      console.log(arrayWatched);
      const update = {
        $set: {
          [`watching.${season - 1}.${episode - 1}`]:
            !arrayWatched[season - 1][episode - 1],
        },
      };
      await serieService.updateSerie(serieUser.id, update, token);

      setEpisodes((episodes) => {
        const newEpisodes = [...episodes];
        newEpisodes[season - 1][episode - 1] = !newEpisodes[season - 1][
          episode - 1
        ];
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
  };
};

export default useSeries;
