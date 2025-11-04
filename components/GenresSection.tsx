"use client";
import { useState } from "react";
import { useGenresQuery } from "@/lib/hook/queries/useGenresQuery";
import MovieFilterView from "./MovieFilterView";

export default function GenresSection() {
  const { data: rawGenres, isError } = useGenresQuery();
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);

  if (isError || !rawGenres) {
    return <div>Не вдалося завантажити жанри.</div>;
  }

  const genres = [
    { id: 0, name: "All genre" },
    ...rawGenres.filter((g) => g.id !== 0),
  ];

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenreId = Number(event.target.value);
    setSelectedGenreId(newGenreId);
  };

  return (
    <section className="my-10 px-4 container mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-text tracking-tight flex items-center gap-2">
        🎬 Filter by Genre
      </h2>
      <div className="relative inline-block w-full sm:w-72">
        <select
          value={selectedGenreId}
          onChange={handleGenreChange}
          className="
                      w-full sm:w-72 appearance-none
                      bg-card text-foreground
                      px-4 py-2.5 rounded-xl
                      border border-border
                      shadow-sm
                      ring-0 focus:outline-none focus:ring-2 focus:ring-accent  
                      hover:border-accent
                      transition-all duration-200 ease-in-out
                      cursor-pointer
                    "
        >
          {genres.map((genre) => (
            <option
              key={genre.id}
              value={genre.id}
              className="bg-card text-foreground hover:bg-accent hover:text-white"
            >
              {genre.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          ▼
        </div>
      </div>
      <div className="mt-8">
        <MovieFilterView id={selectedGenreId} genres={rawGenres} />
      </div>
    </section>
  );
}
