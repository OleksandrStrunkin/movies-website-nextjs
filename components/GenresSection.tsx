"use client";
import { useState } from "react";
import { useGenresQuery } from "@/lib/hook/queries/useGenresQuery";
import MovieFilterView from "./MovieFilterView";
import Filters from "./Filters";

export default function GenresSection() {
  const { data: rawGenres, isError } = useGenresQuery();

  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedType, setSelectedType] = useState<"movie" | "tv">("movie");
  const [page, setPage] = useState<number>(1);

  if (isError || !rawGenres) {
    return <div>Не вдалося завантажити жанри.</div>;
  }

  const genres = [
    { id: 0, name: "All genre" },
    ...rawGenres.filter((g) => g.id !== 0),
  ];

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedGenreId(Number(e.target.value));

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedYear(e.target.value ? Number(e.target.value) : "");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedType(e.target.value as "movie" | "tv");

  const handleNextPage = () => setPage((p) => p + 1);
  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1979 },
    (_, i) => currentYear - i
  );

  return (
    <section className="my-10 px-4 container mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-text tracking-tight flex items-center gap-2">
        🎬 Discover by Filters
      </h2>

      {/* === FILTERS === */}

     
      <Filters
        genres={genres}
        selectedGenreId={selectedGenreId}
        handleGenreChange={handleGenreChange}
        selectedType={selectedType}
        handleTypeChange={handleTypeChange}
        selectedYear={selectedYear.toString()}
        handleYearChange={handleYearChange}
        years={years}
      />

      {/* === MOVIE LIST === */}
      <MovieFilterView
        id={selectedGenreId}
        genres={rawGenres}
        type={selectedType}
        year={selectedYear}
        page={page}
      />

      {/* === PAGINATION === */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover disabled:opacity-50 transition-all"
        >
          ← Prev
        </button>
        <span className="text-foreground/80 font-medium">Page {page}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-all"
        >
          Next →
        </button>
      </div>
    </section>
  );
}
