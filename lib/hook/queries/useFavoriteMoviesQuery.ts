import { useQuery } from "@tanstack/react-query";
import { getMoviesByIds } from "@/lib/api/tmdb";

interface FavoriteMovie {
  id: number;
  poster_path?: string | null;
  title: string;
}

export const useFavoriteMoviesQuery = (favoriteIds: number[] | undefined) => {
  const isEnabled = !!favoriteIds && favoriteIds.length > 0;

  return useQuery<FavoriteMovie[], Error>({
    queryKey: ["favoriteMovies", favoriteIds],
    queryFn: () => getMoviesByIds(favoriteIds!),
    enabled: isEnabled,
    initialData: [],
  });
};
