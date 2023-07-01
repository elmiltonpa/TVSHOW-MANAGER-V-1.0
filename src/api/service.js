import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const searchTvSeasonById = async (id, number) => {
  const request = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/season/${number}?api_key=${API_KEY}&language=es`
  );
  return request.data;
};

const searchTvShow = async (query) => {
  const request = await axios.get(`
    https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=es&query=${query}`);
  return request.data;
};

const searchTvShowById = async (id) => {
  const request = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es`
  );
  return request.data;
};

const popularTvShow = async (page) => {
  const request = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es&page=${page}`
  );
  return request.data;
};
export default {
  searchTvShow,
  popularTvShow,
  searchTvShowById,
  searchTvSeasonById,
};
