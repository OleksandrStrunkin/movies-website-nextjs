import { useMoviesByGenresQuery } from "@/lib/hook/queries/useMoviesByGenresQuery";
import Card from "./Card";
import SkeletonGrid from "./Skeleton/SkeletonGrid";

export default function MovieFilterView({ id }: { id: number }) {
  const genreIds = id === 0 ? [28] : [id];

    const { data: movies, isLoading, isError } = useMoviesByGenresQuery(genreIds);

  if (isLoading) {
    return <SkeletonGrid count={20} />;
  }

  if (isError) {
    return <div>Помилка завантаження фільмів.</div>;
  }

  return (
    <div>
      <ul className="mt-4 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies?.results.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
