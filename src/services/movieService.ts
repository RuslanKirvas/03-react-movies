import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

if (!TMDB_TOKEN) {
  console.error("VITE_TMDB_TOKEN is not set in environment variables");
}

export const fetchMovies = async (query: string): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });

  return response.data;
};

export const getImageUrl = (path: string, size: string = "w500"): string => {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Image";
  }
  return `${IMAGE_BASE_URL}${size}${path}`;
};
