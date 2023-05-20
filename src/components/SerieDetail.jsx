import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/service";
import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";

const IMG = "https://image.tmdb.org/t/p/w500/";

const SerieDetail = ({ token, user }) => {
  const [serie, setSerie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmit = async (e, serieId) => {
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

      await serieService.createSerie({ id: serieId }, token);
    } catch (error) {
      console.log("no hay token pa");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await api.searchTvShowById(id);
      setSerie(request);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>{serie.name}</div>
      <img className="w-80 h-auto" src={IMG + serie.poster_path} alt="" />
      <div>
        <button onClick={(e) => handleSubmit(e, id)}>AGREGAR</button>
      </div>
    </div>
  );
};

export default SerieDetail;
