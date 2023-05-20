import { useParams } from "react-router-dom";
import SectionSeason from "./SectionSeason";
import api from "../api/service";
import { useEffect, useState } from "react";

const SerieProfile = () => {
  const { id } = useParams();
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const Serie = await api.searchTvShowById(id);
      const fetchSeasons = Array.from(
        { length: Serie.number_of_seasons },
        (_, i) => api.searchTvSeasonById(id, i + 1)
      );
      const seasons = await Promise.all(fetchSeasons);
      setSeasons(seasons);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {seasons ? (
        seasons.map((season) => (
          <div
            key={season.id}
            className="bg-red-300 my-10 flex flex-col gap-10"
          >
            <div>
              <SectionSeason episodes={season.episodes} />
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default SerieProfile;
