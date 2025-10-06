import { useMoviesByGenresQuery } from "@/lib/hook/queries/useMoviesByGenresQuery";
import Image from "next/image";

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
      <h1 className="text-3xl">Фільми ({movies?.results.length})</h1>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies?.results.map((movie) => (
            <li key={movie.id} className="bg-gray-800 rounded-lg text-white flex flex-col items-center">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={250}
                    height={300}
                    className="inline-block rounded"
                />
                <p>{movie.title}</p>
                <p>{movie.release_date}</p>
            </li>
        ))}
      </ul>
    </div>
  );
}
