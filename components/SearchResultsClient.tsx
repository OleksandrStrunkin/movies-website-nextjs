"use client";

import Card from "@/components/Card";
import { useFavoritesQuery } from "@/lib/hook/queries/useFavoritesQuery";
import { useAuthStore } from "@/store/useAuthStore";

export default function SearchResultsClient({ movies }: { movies: any[] }) {
  const { token } = useAuthStore();
  const { data: favoriteIdsResponse } = useFavoritesQuery({ token });
  const favoriteIds = favoriteIdsResponse?.favorites ?? [];
  const favoriteSet = new Set(favoriteIds);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {movies.map((m) => (
        <Card key={m.id} movie={m} isFavorite={favoriteSet.has(m.id)} />
      ))}
    </div>
  );
}
