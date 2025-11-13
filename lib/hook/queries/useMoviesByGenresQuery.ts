import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenres } from "@/lib/api/tmdb";

interface UseMoviesByGenresParams {
  genreIds: number[];
  year?: number | "";
  page?: number;
}

export const useMoviesByGenresQuery = ({
  genreIds,
  year,
  page = 1,
}: UseMoviesByGenresParams) =>
  useQuery({
    queryKey: ["moviesByGenres", genreIds, year, page],
    queryFn: () => getMoviesByGenres(genreIds, year, page),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
