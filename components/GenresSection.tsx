import { useState } from "react";
import { useGenresQuery } from "@/lib/hook/queries/useGenresQuery";
import MovieFilterView from "./MovieFilterView";

export default function GenresSection() {
  const { data: rawGenres, isLoading, isError } = useGenresQuery();
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);

  if (isLoading) {
    return <div>Завантаження жанрів...</div>;
  }
  if (isError || !rawGenres) {
    return <div>Не вдалося завантажити жанри.</div>;
  }
  const genres = [
    { id: 0, name: "Всі жанри" },
    ...rawGenres.filter((g) => g.id !== 0),
  ];

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenreId = Number(event.target.value);
    setSelectedGenreId(newGenreId);
  };

  return (
    <section className="my-8 px-4 container mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Filter by Genre</h2>
      <select
        value={selectedGenreId}
        onChange={handleGenreChange}
        className="
                    bg-gray-800 text-white 
                    px-4 py-2 rounded-lg 
                    border border-gray-600 
                    focus:ring-blue-500 focus:border-blue-500 
                    shadow-lg appearance-none 
                    w-full sm:w-64
                "
      >
        {/* 5. Перетворюємо кожен жанр на елемент <option> */}
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <MovieFilterView id={selectedGenreId} />
    </section>
  );
}