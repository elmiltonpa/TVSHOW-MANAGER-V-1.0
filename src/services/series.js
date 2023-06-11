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

const deleteSerie = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = await axios.delete(`${APIURL}/${id}`, config);
  return request;
};

const updateSerie = async (id, serie, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = await axios.put(`${APIURL}/${id}`, serie, config);
  return request;
};

export default { getSeriesByUserId, createSerie, deleteSerie, updateSerie };
