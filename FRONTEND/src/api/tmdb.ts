import axios from "axios";
import { Serie, Season, TMDBResponse } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

const searchTvSeasonById = async (id: string | number, number: number): Promise<Season> => {
  const request = await axios.get<Season>(
    `https://api.themoviedb.org/3/tv/${id}/season/${number}?api_key=${API_KEY}&language=es`
  );
  return request.data;
};

const searchTvShow = async (query: string, page: number): Promise<TMDBResponse<Serie>> => {
  const request = await axios.get<TMDBResponse<Serie>>(`
    https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=es&query=${query}&page=${page}`);
  return request.data;
};

const searchTvShowById = async (id: string | number): Promise<Serie> => {
  const request = await axios.get<Serie>(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es`
  );
  return request.data;
};

const popularTvShow = async (page: number): Promise<TMDBResponse<Serie>> => {
  const request = await axios.get<TMDBResponse<Serie>>(
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