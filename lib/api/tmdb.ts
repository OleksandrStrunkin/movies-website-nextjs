import axios from "axios";
import { MovieListResponse, GenreListResponse } from "../types/movie";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY не встановлено. Перевір файл .env");
}

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

export const fetchTrendingMovies = async (): Promise<MovieListResponse["results"]> => {
  const response = await tmdbApi.get<MovieListResponse>("/trending/movie/week");
  return response.data.results;
};

export const getGenres = async (): Promise<GenreListResponse["genres"]> => {
  const res = await tmdbApi.get<GenreListResponse>("/genre/movie/list", {
    params: { language: "en-US" },
  });
  return res.data.genres;
};

export const getMoviesByGenres = async (
  genreIds: number[]
): Promise<MovieListResponse> => {
  const genresString = genreIds.join(",");

  const res = await tmdbApi.get<MovieListResponse>("/discover/movie", {
    params: {
      language: "en-US",
      with_genres: genresString,
      sort_by: "popularity.desc",
    },
  });

  return res.data;
};