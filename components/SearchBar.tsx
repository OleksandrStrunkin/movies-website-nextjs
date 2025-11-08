"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMoviesBySearch } from "@/lib/api/tmdb";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(term), 400);
    return () => clearTimeout(handler);
  }, [term]);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedTerm],
    queryFn: () => getMoviesBySearch(debouncedTerm),
    enabled: debouncedTerm.length > 1,
  });

  const results = data?.results?.slice(0, 6) || [];

  const handleClear = () => {
    setTerm("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) router.push(`/search?query=${encodeURIComponent(term)}`);
    setTerm("");
  };

  return (
    <div className="relative md:w-92">
      <button type="button" className="md:hidden">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
      <form onSubmit={handleSubmit} className="hidden md:block">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-color-text/60" />
        <input
          type="text"
          placeholder="Search movies..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full shadow-xl rounded-xl bg-transparent pl-10 pr-4 py-2 border border-border
          text-color-text focus:outline-none focus:border-accent transition"
        />
        {term.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Clear search input"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </form>
      {term && results.length > 0 && (
        <ul
          className="fixed top-full left-0 w-full max-h-screen md:absolute md:w-full rounded-none md:rounded-xl 
               bg-card border-none md:border border-border shadow-none md:shadow-lg overflow-y-auto 
               z-50 py-2 backdrop-blur-md"
        >
          {results.map((movie) => (
            <li key={movie.id} className="border-b-1">
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-3 px-3 py-2 text-sm text-color-text hover:bg-accent/10 transition group"
                onClick={() => setTerm("")}
              >
                {movie.poster_path ? (
                  <div className="relative w-16 h-16 overflow-hidden rounded-md flex-shrink-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover rounded-md transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-border rounded-md flex items-center justify-center text-xs text-color-text/50">
                    N/A
                  </div>
                )}

                <div className="flex flex-col overflow-hidden">
                  <span className="truncate font-medium">{movie.title}</span>
                  <span className="text-xs text-color-text/60">
                    {movie.release_date?.slice(0, 4) || "—"}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {term && !isLoading && results.length === 0 && (
        <div className="absolute top-full left-0 mt-2 w-full rounded-xl bg-card border border-border shadow-lg p-3 text-sm text-color-text/60">
          No results
        </div>
      )}
    </div>
  );
}
