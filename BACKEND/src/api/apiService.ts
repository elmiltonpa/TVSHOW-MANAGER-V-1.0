import axios from "axios";
import config from "../config.js";

const API_KEY = config.TMDB_API_KEY;

export interface ITMDBSerie {
  id: number;
  name: string;
  seasons: {
    season_number: number;
    episode_count: number;
  }[];
}

export const getSerie = async (id: string | number, language: string = "es"): Promise<ITMDBSerie> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=${language}`
  );
  return response.data;
};