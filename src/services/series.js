import axios from "axios";

const APIURL = "https://backend-tvshowmanager.vercel.app/api/series";

const getSeriesByUserId = async (id) => {
  const request = await axios.get(`${APIURL}/${id}`);
  return request.data;
};

const createSerie = async (serie, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = await axios.post(APIURL, serie, config);
  return request;
};

export default { getSeriesByUserId, createSerie };
