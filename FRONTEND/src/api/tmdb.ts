import axios from "axios";
import { Serie, Season, TMDBResponse } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

const searchTvSeasonById = async (id: string | number, number: number, language: string = "es"): Promise<Season> => {
  const request = await axios.get<Season>(
    `https://api.themoviedb.org/3/tv/${id}/season/${number}?api_key=${API_KEY}&language=${language}`
  );
  return request.data;
};

const searchTvShow = async (query: string, page: number, language: string = "es"): Promise<TMDBResponse<Serie>> => {
  const request = await axios.get<TMDBResponse<Serie>>(`
    https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}`);
  return request.data;
};

const searchTvShowById = async (id: string | number, language: string = "es"): Promise<Serie> => {
  const request = await axios.get<Serie>(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=${language}`
  );
  return request.data;
};

const popularTvShow = async (page: number, language: string = "es"): Promise<TMDBResponse<Serie>> => {
  const request = await axios.get<TMDBResponse<Serie>>(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=${language}&page=${page}`
  );
  return request.data;
};

export default {
  searchTvShow,
  popularTvShow,
  searchTvShowById,
  searchTvSeasonById,
};