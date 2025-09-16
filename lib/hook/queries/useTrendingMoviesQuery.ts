import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "@/lib/api/tmdb";

export const useTrendingMoviesQuery = () => {
  return useQuery({
    queryKey: ["popular-movies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};