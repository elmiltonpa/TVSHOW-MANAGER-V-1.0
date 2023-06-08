import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";

const useSeries = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    e,
    serieId,
    user,
    token,
    setSeriesAdded,
    seriesAdded
  ) => {
    e.preventDefault();
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const User = await getUser(user.username);

      const userSeries = await serieService.getSeriesByUserId(User.id);

      const serieAlreadyAdded = userSeries.some(
        (serie) => serie.tv_id == serieId
      );

      if (serieAlreadyAdded) {
        console.log("serie ya agregada");
        return;
      }
      setSeriesAdded([...seriesAdded, serieId]);
      await serieService.createSerie({ id: serieId }, token);
      console.log("agregada");
    } catch (error) {
      console.log("no hay token pa");
    }
  };

  //PARA AGREGAR SERIE A FAVORITOS DESDE EL DETALLE DE SERIE
  const handleSubmit2 = async (e, serieId, setSeriesAdded) => {
    e.preventDefault();
    const session = JSON.parse(window.localStorage.getItem("session"));
    const { token, username } = session;
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const User = await getUser(username);
      const userSeries = await serieService.getSeriesByUserId(User.id);
      const serieAlreadyAdded = userSeries.some(
        (serie) => serie.tv_id == serieId
      );
      if (serieAlreadyAdded) {
        console.log("serie ya agregada");
        return;
      }
      await serieService.createSerie({ id: serieId }, token);
      console.log("agregada");
      setSeriesAdded(true);
    } catch (error) {
      console.log("Error al agregar serie a favoritos");
    }
  };

  //PARA ELIMINAR SERIE DE FAVORITOS DESDE EL HOME
  const handleDelete = async (e, serieId, setSeriesAdded, seriesAdded) => {
    e.preventDefault();
    const session = JSON.parse(window.localStorage.getItem("session"));
    const { token, username } = session;
    console.log(token);
    console.log(username);
    console.log(serieId);
    console.log(seriesAdded);
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const User = await getUser(username);
      const seriesUser = await serieService.getSeriesByUserId(User.id);
      const serieToDelete = seriesUser.find((serie) => serie.tv_id == serieId);
      console.log(seriesUser);
      await serieService.deleteSerie(serieToDelete.id, token);
      setSeriesAdded(seriesAdded.filter((serie) => serie !== serieId));
      console.log("eliminada");
    } catch (error) {
      console.log("Error al eliminar serie de favoritos");
    }
  };

  //PARA ELIMINAR SERIE DE FAVORITOS DESDE EL PERFIL
  const handleDelete2 = async (e, serieId, seriesUserFav, setSeriesUser) => {
    e.preventDefault();
    const session = JSON.parse(window.localStorage.getItem("session"));
    const { token, username } = session;

    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const User = await getUser(username);
      const seriesUser = await serieService.getSeriesByUserId(User.id);
      const serieToDelete = seriesUser.find((serie) => serie.tv_id == serieId);
      await serieService.deleteSerie(serieToDelete.id, token);
      setSeriesUser(seriesUserFav.filter((serie) => serie.tv_id !== serieId));
      console.log("Eliminada");
    } catch (error) {
      console.log("Error al eliminar serie de favoritos");
    }
  };

  const handleDelete3 = async (e, serieId, setSeriesAdded) => {
    e.preventDefault();
    const session = JSON.parse(window.localStorage.getItem("session"));
    const { token, username } = session;
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const User = await getUser(username);
      const seriesUser = await serieService.getSeriesByUserId(User.id);
      const serieToDelete = seriesUser.find((serie) => serie.tv_id == serieId);
      await serieService.deleteSerie(serieToDelete.id, token);
      console.log("Eliminada");
      setSeriesAdded(false);
    } catch (error) {
      console.log("Error al eliminar serie de favoritos");
    }
  };

  return {
    handleSubmit,
    handleDelete,
    handleDelete2,
    handleSubmit2,
    handleDelete3,
  };
};

export default useSeries;
