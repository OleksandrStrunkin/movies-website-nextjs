"use client";
import { useState, useMemo } from "react";
import { useGenresQuery } from "@/lib/hook/queries/useGenresQuery";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import MovieFilterView from "./MovieFilterView";
import Filters from "./Filters";

const TOTAL_PAGES_PLACEHOLDER = 50;
const getPaginationPages = (currentPage: number, totalPages: number) => {
  const pageRange = [];
  const maxButtons = 5; 

  if (totalPages > 0) pageRange.push(1);
  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);
  if (currentPage < 3) end = Math.min(totalPages - 1, maxButtons - 2);
  if (currentPage > totalPages - 2)
    start = Math.max(2, totalPages - (maxButtons - 2));
  if (start > 2) {
    pageRange.push("...");
  }
  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== totalPages) {
      pageRange.push(i);
    }
  }
  if (end < totalPages - 1 && totalPages > maxButtons) {
    pageRange.push("...");
  }
  if (totalPages > 1 && !pageRange.includes(totalPages)) {
    pageRange.push(totalPages);
  }

  return pageRange;
};
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PaginationButtons = ({
  currentPage,
  totalPages,
  setPage,
}: PaginationProps) => {
  const pages = useMemo(
    () => getPaginationPages(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const buttonClass = (pageNumber: number) =>
    `px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 
         ${
           pageNumber === currentPage
             ? "bg-accent text-white"
             : "bg-card text-foreground hover:bg-muted"
         }`;

  const handleGoToPage = (pageNumber: string | number) => {
    if (typeof pageNumber === "number") {
      setPage(pageNumber);
    }
  };

  return (
    <>
      {pages.map((p, index) => (
        <div key={index}>
          {p === "..." ? (
            <span className="text-foreground/60 px-3 py-1">...</span>
          ) : (
            <button
              onClick={() => handleGoToPage(p)}
              className={buttonClass(Number(p))}
            >
              {p}
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default function GenresSection() {
  const { data: rawGenres, isError } = useGenresQuery();

  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number | "">("");

  const [page, setPage] = useState<number>(1);
  const totalPages = TOTAL_PAGES_PLACEHOLDER;

  if (isError || !rawGenres) {
    return <div>Failed to load genres.</div>;
  }

  const genres = [
    { id: 0, name: "All genre" },
    ...rawGenres.filter((g) => g.id !== 0),
  ];

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedGenreId(Number(e.target.value));

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedYear(e.target.value ? Number(e.target.value) : "");

  const handleSetPage = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const handleNextPage = () => handleSetPage(page + 1);
  const handlePrevPage = () => handleSetPage(page - 1);

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
        selectedYear={selectedYear.toString()}
        handleYearChange={handleYearChange}
        years={years}
      />
      {/* === MOVIE LIST === */}
      <MovieFilterView
        id={selectedGenreId}
        genres={rawGenres}
        
        year={selectedYear}
        page={page}
      />
      {/* === PAGINATION === */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="p-2 border border-border rounded-md hover:bg-muted disabled:opacity-50 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <PaginationButtons
          currentPage={page}
          totalPages={totalPages}
          setPage={handleSetPage}
        />
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="p-2 border border-border rounded-md hover:bg-muted disabled:opacity-50 transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
