import axios from "axios";
import { MovieListResponse, GenreListResponse } from "../types/movie";
import { MovieDetailsResponse } from "../types/details";
import type { AxiosResponse } from "axios";

export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY не встановлено. Перевір файл .env");
}

export const tmdbApi = axios.create({
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
  genreIds: number[],
  type: "movie" | "tv" = "movie",
  year?: number | "",
  page: number = 1
): Promise<MovieListResponse> => {
  const genresString = genreIds.join(",");

  const res = await tmdbApi.get<MovieListResponse>(`/discover/${type}`, {
    params: {
      language: "en-US",
      with_genres: genresString || undefined,
      sort_by: "popularity.desc",
      ...(year
        ? type === "movie"
          ? { primary_release_year: year }
          : { first_air_date_year: year }
        : {}),
      page,
    },
  });
  return res.data;
};

export const getMovieDetails = async (movieId: string) => {
  const res = await tmdbApi.get<MovieDetailsResponse>(`/movie/${movieId}`, {
    params: {
      language: "en-US",
      append_to_response: "videos,credits",
    },
  });
  return res.data;
};

export const getMoviesBySearch = async (query: string): Promise<MovieListResponse> => {
  const res = await tmdbApi.get<MovieListResponse>("/search/movie", {
    params: {
      query,
      language: "en-US",
      include_adult: false,
    },
  });

  return res.data;
};

export const getMoviesByIds = async (movieIds: string[]) => {
  try {
    const requests = movieIds.map((id) =>
      tmdbApi.get<MovieDetailsResponse>(`/movie/${id}`, {
        params: { language: "en-US" },
      })
    );
    const results = await Promise.allSettled(requests);
    
    return results
      .filter(
        (r): r is PromiseFulfilledResult<AxiosResponse<MovieDetailsResponse>> =>
          r.status === "fulfilled"
      )
      .map((r) => r.value.data);
  } catch (err) {
    console.error("Error fetching movies by IDs:", err);
    return [];
  }
};
