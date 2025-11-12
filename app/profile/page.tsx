"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

import UserProfileCard from "@/components/UserProfileCard";
import { useFavoritesQuery } from "@/lib/hook/queries/useFavoritesQuery";
import { useFavoriteMoviesQuery } from "@/lib/hook/queries/useFavoriteMoviesQuery";


export default function ProfilePage() {
  const { user, token } = useAuthStore();
  const router = useRouter();

  const {
    data: favoriteIdsResponse,
    isLoading: isLoadingFavorites,
  } = useFavoritesQuery({ token });

  const {
    data: favorites,
    isLoading: isLoadingMovies,
  } = useFavoriteMoviesQuery(favoriteIdsResponse?.favorites);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-foreground bg-background">
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg w-full max-w-md text-center">
          <p className="text-foreground/70 mb-4">You are not logged in.</p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition"
          >
            Go to Login
          </button>
        </div>
        
      </div>
    );
  }

  const isDataLoading = isLoadingFavorites || isLoadingMovies;

  return (
    <div className="container mx-auto min-h-screen flex flex-col lg:flex-row gap-6 items-start justify-start text-foreground bg-background px-6 md:py-12">
     <UserProfileCard user={user!} />
      <div className="bg-card border border-border rounded-xl p-2 md:p-6 shadow-lg w-full">
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
          Favorite Movies
        </h2>

        {isDataLoading ? (
          <p className="text-center text-foreground/60">Loading...</p>
        ) : favorites.length === 0 ? (
          <p className="text-center text-foreground/60">
            You haven’t added any favorite movies yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative aspect-[2/3]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 text-center text-sm font-medium truncate">
                  {movie.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
