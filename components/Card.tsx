"use client"

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types/movie";
import {
  PlayIcon,
  BookmarkIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useFavoriteMutation } from "@/lib/hook/mutations/useFavoriteMutation";

interface CardProps {
  movie: Movie;
  genres?: { id: number; name: string }[];
}

export default function Card({ movie, genres }: CardProps) {
   const { token } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutateAsync, isPending } = useFavoriteMutation();

  const genresNames = movie.genre_ids
    .slice(0, 2)
    .map((id) => genres?.find((g) => g.id === id)?.name)
    .filter((name) => !!name)
    .join(", ");
  
  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const data = await mutateAsync({ movieId: movie.id, token });
      setIsFavorite(data.message === "Added to favorites");
    } catch (err) {
      console.error("❌ Error toggling favorite:", err);
    }
  };

  return (
    <>
      <Link
        href={`/movie/${movie.id}`}
        key={movie.id}
        className="group relative bg-card border border-border rounded-xl overflow-hidden
               flex flex-col items-center text-center shadow-sm
               hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <div className="relative w-full overflow-hidden rounded-t-xl cursor-pointer bg-card aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || "movie image"}
            className="absolute inset-0 object-cover group-hover:blur-sm group-hover:brightness-50 transition-all duration-300"
            fill={true}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {!movie.poster_path && (
            <div className="absolute inset-0 bg-card border-b-1 flex flex-col items-center justify-center text-color-text/60 bg-color-card">
              <PhotoIcon className="w-12 h-12" />
              <span className="text-xs mt-1">No poster</span>
            </div>
          )}
          <button
            title="Watch trailer"
            className="absolute inset-0 flex items-center justify-center text-white opacity-0 cursor-pointer group-hover:opacity-100 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-accent/30 hover:bg-accent-hover flex items-center justify-center transition-all duration-300">
              <PlayIcon className="w-8 h-8 text-white" />
            </div>
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4 opacity-0 cursor-pointer group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleFavorite}
              title="Favorite"
              disabled={isPending}
              className="p-2 rounded-full bg-accent/30 hover:bg-accent-hover transition-all duration-300"
            >
              {isFavorite ? (
                <HeartSolid className="w-5 h-5 text-white" />
              ) : (
                <HeartOutline className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              title="Look later"
              className="p-2 rounded-full bg-accent/30 hover:bg-accent-hover cursor-pointer transition-all duration-300"
            >
              <BookmarkIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        <div className="p-2 flex flex-col text-start gap-1 w-full bg-card/90">
          <h3 className="text-xs text-foreground truncate">{movie.title}</h3>
          <div className="flex gap-1 items-">
            <span className="text-xs text-foreground">
              {movie.release_date?.slice(0, 4)}
            </span>
            <span className="text-xs text-foreground/80 truncate">
              {genresNames}
            </span>
          </div>
        </div>
        <div
          className="absolute top-2 right-2 flex gap-1 items-center px-2 py-1 text-xs font-medium rounded-md
                    bg-accent/80 text-white shadow-md opacity-0 group-hover:opacity-100
                    transition-all duration-300"
        >
          <StarIcon className="w-4 h-4 text-white" />{" "}
          {movie.vote_average.toFixed(1)}
        </div>
      </Link>
    </>
  );
}
