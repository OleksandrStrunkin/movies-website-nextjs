import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "@/lib/api/favorite";

interface FavoritesResponse {
  favorites: number[];
}

interface UseFavoritesQueryOptions {
  token: string | null;
}

export const useFavoritesQuery = ({ token }: UseFavoritesQueryOptions) => {
  return useQuery<FavoritesResponse, Error>({
    queryKey: ["favorites", token],
    queryFn: () => fetchFavorites(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};
