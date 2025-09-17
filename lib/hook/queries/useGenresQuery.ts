import { useQuery } from "@tanstack/react-query";

import { getGenres } from "@/lib/api/tmdb";

export const useGenresQuery = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
} 