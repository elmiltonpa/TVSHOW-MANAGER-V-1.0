export interface User {
  id?: string;
  username: string;
  token?: string;
  expirationDate?: number;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  air_date: string;
  vote_average: number;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episodes: Episode[];
  poster_path: string | null;
}

export interface Serie {
  id?: string;
  tv_id: number;
  tv_title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  vote_average: number;
  first_air_date?: string;
  genres?: { id: number; name: string }[];
  tagline?: string;
  status?: string;
  created_by?: { id: number; name: string }[];
  vote_count?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;

  favorite?: boolean;
  watched?: boolean;
  watching?: boolean[][] | boolean;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface AuthResponse {
  username: string;
  token: string;
}
