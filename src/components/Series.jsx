import seriesService from "../services/series";

const Series = ({ user }) => {
  const getMySeries = async () => {
    const seriesId = await seriesService.getSeriesByUserId(user.id);
    console.log(seriesId);
  };

  return (
    <div>
      <button onClick={getMySeries}>Get Series</button>
    </div>
  );
};

export default Series;
