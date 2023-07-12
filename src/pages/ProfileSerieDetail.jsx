import { useParams } from "react-router-dom";
import SectionSeason from "../components/seasons/SectionSeason";
import api from "../api/service";
import { useEffect, useState } from "react";

const ProfileSerieDetail = ({ seasonwatching }) => {
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
    <div className="flex flex-col gap-4 w-full">
      {seasons ? (
        seasons.map((season) => (
          <div key={season.id} className="bg-red-300 flex flex-col">
            <div className="bg-purpuraoscuro h-full flex flex-col gap justify-center items-center">
              <SectionSeason
                seasonwatching={seasonwatching}
                season={season.season_number}
                episodes={season.episodes}
                serieId={id}
              />
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default ProfileSerieDetail;
