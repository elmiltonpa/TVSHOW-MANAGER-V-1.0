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

  const handleDelete = async (
    e,
    serieId,
    user,
    token,
    setSeriesAdded,
    seriesAdded
  ) => {
    e.preventDefault();
    //NO ES LA ID DEL ARRAY DE SERIES, ES EL ID DE LA SEREI

    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const User = await getUser(user.username);
      const seriesUser = await serieService.getSeriesByUserId(User.id);
      const serieToDelete = seriesUser.find((serie) => serie.tv_id == serieId);
      await serieService.deleteSerie(serieToDelete.id, token);
      setSeriesAdded(seriesAdded.filter((serie) => serie !== serieId));
      console.log("eliminada");
    } catch (error) {
      console.log("no hay token pa");
    }
  };

  return { handleSubmit, handleDelete };
};

export default useSeries;
