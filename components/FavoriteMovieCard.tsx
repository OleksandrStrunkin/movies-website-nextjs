"use client";

import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Movie } from "@/lib/types/movie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "@heroicons/react/24/outline";

import { useFavoriteMutation } from "@/lib/hook/mutations/useFavoriteMutation";

interface FavoriteMovieCardProps {
  movie: Movie;
}

export default function FavoriteMovieCard({
  movie,
}: FavoriteMovieCardProps) {
  const { token } = useAuthStore();
    const { mutate, isPending } = useFavoriteMutation();

  const genresNames = movie.genres
    ?.slice(0, 2)
    .map((genre) => genre.name)
    .join(", ");

   const handleRemove = () => {
     if (!token) {
       console.error("Authentication required to remove favorites.");
       return;
     }
     mutate({ movieId: movie.id, token });
   };


  return (
    <div
      className="flex flex-col sm:flex-row bg-card border border-border rounded-xl overflow-hidden shadow-sm
                 hover:shadow-md transition-all duration-300"
    >
      {/* Left — Poster */}
      <div className="relative w-full sm:w-1/3 aspect-[2/3] sm:aspect-auto">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || "movie poster"}
          fill
          className="object-cover"
        />
      </div>

      {/* Right — Info */}
      <div className="flex flex-col justify-between p-4 w-full sm:w-2/3 text-foreground">
        <div>
          <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
          <p className="text-sm text-foreground/70 mb-1">
            {movie.release_date?.slice(0, 4)} • {genresNames}
          </p>
          <p className="text-sm text-foreground/80 line-clamp-3">
            {movie.overview}
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleRemove}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                       bg-red-500 hover:bg-red-600 text-white transition-all duration-300 disabled:opacity-50"
          >
            <TrashIcon className="w-4 h-4" />
            {isPending ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
