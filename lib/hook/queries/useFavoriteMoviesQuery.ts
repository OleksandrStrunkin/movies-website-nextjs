import { useQuery } from "@tanstack/react-query";
import { getMoviesByIds } from "@/lib/api/tmdb";

export interface Genre {
  id: number;
  name: string;
}

export interface DisplayMovie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  genres: Genre[];
}

export const useFavoriteMoviesQuery = (favoriteIds: number[] | undefined) => {
  const isEnabled = !!favoriteIds && favoriteIds.length > 0;

  return useQuery<DisplayMovie[], Error>({
    queryKey: ["favoriteMovies", favoriteIds],
    queryFn: () => getMoviesByIds(favoriteIds!),
    enabled: isEnabled,
    initialData: [],
  });
};
