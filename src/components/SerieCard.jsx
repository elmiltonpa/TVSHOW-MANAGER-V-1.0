import serieService from "../services/series";
import getUser from "../services/user";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://image.tmdb.org/t/p/w500/";

const SerieCard = ({ serie, token, user }) => {
  const navigate = useNavigate();
  console.log(serie);
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

  return (
    <div className="flex gap-3 my-3 w-full bg-red-200">
      <div className=" gap-x-2 w-[78%] border-r-2">
        <div className="flex gap-x-2">
          <div className="h-full">
            <img src={BASE_URL + serie.poster_path} width={200} />
          </div>
          <div className="h-[300px] w-[72%] flex flex-col justify-between py-2 items-center">
            <div className="flex flex-col gap-y-2 items-center h-[80%]">
              <h1 className="text-3xl font-semibolds font-lato text-center">
                {serie.name}
              </h1>
              <p className="text-base overflow-auto  font-overview text-center">
                {serie.overview}
              </p>
            </div>
            <div className="items-center">
              <button
                onClick={(e) => handleSubmit(e, serie.id)}
                className="text-lg font-semibold text-purpuraoscuro"
              >
                AGREGAR A FAVORITOS
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[20%]">
        <div className="flex h-full flex-col justify-between py-3 items-center">
          <div>
            <span className="text-2xl font-semibold">
              {serie.first_air_date.slice(0, 4)}
            </span>
          </div>
          <div>
            <div className="text-center">
              {serie.genres.map((genre) => genre.name).join(", ")}
            </div>
          </div>
          <div>
            <div>
              <h2>
                Episodes <span>{serie.number_of_episodes}</span>
              </h2>
            </div>
            <div>
              <h2>
                Seasons <span>{serie.number_of_seasons}</span>
              </h2>
            </div>
          </div>
          <div>
            <h2>
              Rating <span>{parseFloat(serie.vote_average.toFixed(2))}</span>
            </h2>
          </div>
          <div>
            <button className="text-lg font-semibold text-purpuraoscuro">
              VER DETALLES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <button
              onClick={(e) => {
                handleSubmit(e, serie.id);
              }}
            >
              AGREGAR
            </button> */
}

//   <div>
//   <Link to={`/serie/${serie.id}`}>VER DETALLES</Link>
// </div>

export default SerieCard;
