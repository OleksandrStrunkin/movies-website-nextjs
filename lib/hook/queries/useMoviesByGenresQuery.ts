// 📁 /lib/hook/queries/useMoviesByGenresQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenres } from "@/lib/api/tmdb";

interface UseMoviesByGenresParams {
  genreIds: number[];
  type: "movie" | "tv";
  year?: number | "";
  page?: number;
}

export const useMoviesByGenresQuery = ({
  genreIds,
  type,
  year,
  page = 1,
}: UseMoviesByGenresParams) =>
  useQuery({
    queryKey: ["moviesByGenres", genreIds, type, year, page],
    queryFn: () => getMoviesByGenres(genreIds, type, year, page),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
