"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMoviesBySearch } from "@/lib/api/tmdb";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedTerm],
    queryFn: () => getMoviesBySearch(debouncedTerm),
    enabled: debouncedTerm.length > 1,
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(term), 400);
    return () => clearTimeout(handler);
  }, [term]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      router.push(`/search?query=${encodeURIComponent(term)}`);
      setIsSearchOpen(false);
      setTerm("");
    }
  };

  const handleClear = () => setTerm("");
  const toggleSearch = () => setIsSearchOpen((p) => !p);

  const results = data?.results?.slice(0, 6) || [];

  return (
    <div className="relative md:w-92">
      {/* MOBILE ICON */}
      <button
        type="button"
        onClick={toggleSearch}
        className="md:hidden p-2 rounded-full hover:bg-accent/10 transition-colors duration-300"
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
      </button>

      {/* DESKTOP SEARCH */}
      <form
        onSubmit={handleSubmit}
        className="hidden md:flex relative items-center"
      >
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search movies..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full rounded-xl border border-border pl-10 pr-4 py-2 bg-transparent text-color-text 
          focus:outline-none focus:border-accent transition"
        />
        {term && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:bg-accent/10"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}

        {/* DESKTOP RESULTS */}
        {term && (
          <div className="absolute top-full left-0 w-full mt-2 rounded-b-xl bg-white border border-border shadow-lg z-50">
            {isLoading ? (
              <p className="p-3 text-sm text-gray-500">Loading...</p>
            ) : results.length > 0 ? (
              <ul>
                {results.map((movie) => (
                  <li key={movie.id}>
                    <Link
                      href={`/movie/${movie.id}`}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/10 transition"
                      onClick={() => setTerm("")}
                    >
                      {movie.poster_path ? (
                        <div className="relative w-10 h-14 flex-shrink-0">
                          <Image
                            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                            alt={movie.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-14 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400">
                          N/A
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">
                          {movie.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {movie.release_date?.slice(0, 4) || "—"}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-3 text-sm text-gray-500">No results</p>
            )}
          </div>
        )}
      </form>

      {/* MOBILE FULLSCREEN SEARCH */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-card flex flex-col p-4 animate-fade-in">
          {/* HEADER BAR WITH CLOSE BUTTON */}
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Search</h2>
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center"
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                autoFocus
                className="w-full text-color-text bg-transparent pl-10 pr-10 py-2 
           border-b border-gray-300 focus:border-b-2 focus:border-accent 
           focus:outline-none transition-all"
              />
            </form>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setTerm("");
              }}
              className="p-2 hover:bg-accent/10 rounded-full"
              aria-label="Close search"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* RESULTS LIST */}
          {term && (
            <div className="absolute top-full left-0 w-full rounded-b-xl bg-card border border-border shadow-lg z-50">
              {isLoading ? (
                <div className="flex justify-center items-center p-4">
                  <span className="block animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full border-solid" />
                </div>
              ) : results.length > 0 ? (
                <ul>
                  {results.map((movie) => (
                    <li key={movie.id}>
                      <Link
                        href={`/movie/${movie.id}`}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition"
                        onClick={() => {
                          setTerm("");
                          setIsSearchOpen(false);
                        }}
                      >
                        {movie.poster_path ? (
                          <div className="relative w-12 h-16">
                            <Image
                              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                              alt={movie.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400">
                            N/A
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium">{movie.title}</p>
                          <p className="text-xs text-gray-500">
                            {movie.release_date?.slice(0, 4) || "—"}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center mt-4 py-4">
                  No results
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
