import axios from "axios";

const baseURL = "https://backend-tvshowmanager.vercel.app/api/series";

// const baseURL = "http://localhost:3002/api/series";

const getSeriesByUserId = async (id) => {
  const request = await axios.get(`${baseURL}/${id}`);
  return request.data;
};

const createSerie = async (serie, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = await axios.post(baseURL, serie, config);
  return request;
};

export default { getSeriesByUserId, createSerie };
