import { useMoviesByGenresQuery } from "@/lib/hook/queries/useMoviesByGenresQuery";
import Card from "./Card";
import SkeletonGrid from "./Skeleton/SkeletonGrid";

interface MovieFilterViewProps {
  id: number;
  genres: { id: number; name: string }[];
  type: "movie" | "tv";
  year?: number | "";
  page?: number;
}

export default function MovieFilterView({
  id,
  genres,
  type,
  year,
  page = 1,
}: MovieFilterViewProps) {
  const genreIds = id === 0 ? [] : [id];

  const {
    data: movies,
    isLoading,
    isError,
  } = useMoviesByGenresQuery({
    genreIds,
    type,
    year,
    page,
  });

  if (isLoading) {
    return <SkeletonGrid count={20} />;
  }

  if (isError) {
    return <div>failed to download movies</div>;
  }

  if (!movies?.results?.length) {
    return (
      <p className="text-center text-foreground/60 mt-8">
        Nothing found for the selected filters
      </p>
    );
  }

  return (
    <div>
      <ul className="mt-4 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.results.map((movie) => (
          <Card key={movie.id} movie={movie} genres={genres} />
        ))}
      </ul>
    </div>
  );
}
