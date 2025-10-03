import { useQuery } from "@tanstack/react-query";
import { MovieListResponse } from "@/lib/types/movie";
import { getMoviesByGenres } from "@/lib/api/tmdb";
const MOVIE_GENRES_KEY = "movies-by-genres";

export const useMoviesByGenresQuery = (genreIds: number[] = []) => {
  const enabled = genreIds && genreIds.length > 0;

  return useQuery<MovieListResponse, Error>({
    queryKey: [MOVIE_GENRES_KEY, genreIds],
    queryFn: () => getMoviesByGenres(genreIds),
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
  });
};
