import axios, { type AxiosResponse } from "axios";
import type { Movie, MoviesResponse } from "../types/movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

if (!TMDB_TOKEN) {
  console.error("VITE_TMDB_TOKEN is not set in environment variables");
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response: AxiosResponse<MoviesResponse> = await api.get(
      "/search/movie",
      {
        params: {
          query,
          include_adult: false,
          language: "uk-UA",
          page: 1,
        },
      },
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getImageUrl = (
  path: string,
  size: "w500" | "original" = "w500",
): string => {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
