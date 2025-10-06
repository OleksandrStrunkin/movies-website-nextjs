import { useMoviesByGenresQuery } from "@/lib/hook/queries/useMoviesByGenresQuery";
import Card from "./Card";

export default function MovieFilterView({ id }: { id: number }) {
  const genreIds = id === 0 ? [28] : [id];

    const { data: movies, isLoading, isError } = useMoviesByGenresQuery(genreIds);
    console.log(movies);

  if (isLoading) {
    return <div>Завантаження фільмів...</div>;
  }

  if (isError) {
    return <div>Помилка завантаження фільмів.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl">Films ({movies?.results.length})</h1>
      <ul className="mt-4 max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies?.results.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
