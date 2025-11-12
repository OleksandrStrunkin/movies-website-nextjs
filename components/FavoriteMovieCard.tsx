"use client";

import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { TrashIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useFavoriteMutation } from "@/lib/hook/mutations/useFavoriteMutation";

export interface Genre {
  id: number;
  name: string;
}

export interface DisplayMovie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  genres: Genre[];
}

interface FavoriteMovieCardProps {
  movie: DisplayMovie;
}

export default function FavoriteMovieCard({ movie }: FavoriteMovieCardProps) {
  const { token } = useAuthStore();
  const { mutate, isPending } = useFavoriteMutation();
  const [isRemoving, setIsRemoving] = useState(false);

  const genresNames = movie.genres
    ?.slice(0, 2)
    .map((genre) => genre.name)
    .join(", ");

  const handleRemoveWithAnimation = () => {
    if (!token) {
      console.error("Authentication required to remove favorites.");
      return;
    }

    setIsRemoving(true);
    mutate({ movieId: movie.id, token });
  };

  return (
    <div
      className="flex flex-col sm:flex-row bg-card border border-border rounded-xl overflow-hidden shadow-sm
                 hover:shadow-md transition-all duration-300"
    >
      {/* Left — Poster */}
      <div className="relative w-full sm:w-48 flex-shrink-0">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || "movie poster"}
          width={200}
          height={300}
          className="object-cover w-full h-auto"
        />
      </div>

      {/* Right — Info */}
      <div className="flex flex-col justify-between p-4 w-full text-foreground min-h-[200px]">
        <div>
          <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
          <p className="text-sm text-foreground/70 mb-1">
            {movie.release_date?.slice(0, 4)} • {genresNames}
          </p>
          <p className="text-sm text-foreground/80 line-clamp-6">
            {movie.overview}
          </p>
        </div>

        <div className="flex justify-end mt-4 h-10">
          <AnimatePresence>
            {!isRemoving && (
              <motion.button
                onClick={handleRemoveWithAnimation}
                disabled={isPending || isRemoving}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                           bg-accent text-white hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 cursor-pointer"
                initial={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: 100,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  exit={{
                    x: 50,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                >
                  <TrashIcon className="w-4 h-4" />
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
